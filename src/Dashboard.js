import React from "react";
import { Chart, HorizontalStackedBar } from "@newamerica/charts";
import { ButtonGroup, Select } from "@newamerica/components";
import { ChartContainer } from "@newamerica/meta";
import { colorsets } from "./lib/colorsets";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_demographic: 'Total',
      filter_finding: 'jobs',
    };

    this.handleFilterDemographicChange = this.handleFilterDemographicChange.bind(this);
    this.handleFilterFindingChange = this.handleFilterFindingChange.bind(this);

    this.data = this.props.data.data;
    this.comparison_demographic = this.props.data.meta[0].comparison_demographic;
    this.total_demographic = this.props.data.meta[0].demographic_key_for_total;
    this.filtered_data_unavailable_text = this.props.data.meta[0].filtered_data_unavailable_text;

    /*
    This is the format for the new questions data object:
    {
      Question-level information (question number and text)
      total: { // this is for comparison
        demographic_value: "Total",
        demographic_total: "5023",
        "Much more": "2%", // "Response" for the first value
        "Somewhat": "5%",  // same as the previous, for an arbitrary number of responses
        ...
      }
      demographic_keys: [
        {
          demographic_key: "Total",
          demographics: [
            demographic_value: "2019",
            demographic_total: 5023,
            "Much more": "2%", // "Response" for the first value
            "Somewhat": "5%",  // same as the previous, for an arbitrary number of responses
            ...
          ]
        },
        ...
      ]
    },
    ...
    */
    this.questions = this.props.data.questions
    .map(q => {
      let q_data = this.data.filter(d => 
        d["Q Number"] == q.number_specific 
      );
      return ({
        question_number: q.number_general,
        question_specific: q.number_specific,
        content_general: q.content_general,
        content_specific: q.content_specific,
        colorset: q.colorset,
        total: [
          Object.assign(
            {
              demographic_value: "Total",
              demographic_total:
                Object.keys(q_data).reduce((acc,cur) => acc + (Number(q_data[cur][this.comparison_demographic]) > 0 ? Number(q_data[cur][this.comparison_demographic]) : 0), 0),
            }, 
            ...q_data.map(row => ({
              [row["Responses"]]:
                row[this.comparison_demographic]
            }))
          )
        ],
        demographic_keys: 
          this.props.data.demographic_keys
            .map(key => {
              let demographic_values = this.props.data.demographic_values.filter(d => d.demographic_key == key.demographic_key);
              let response_data = q_data.map(row => 
                  Object.assign(...Object.keys(row)
                    .filter(k => demographic_values.map(d => d.demographic_full).includes(k) || k == "Responses")
                    .map(k => ({[k]: row[k]}))
                  )
                );
              return ({
                demographic_key: key.demographic_key,
                demographics: [
                  ...demographic_values.map(demographic => 
                    Object.assign(
                      {
                        demographic_value: demographic.demographic_value,
                        demographic_total:
                          Object.keys(response_data).filter(k => k != "Responses").reduce((acc,cur) => acc + (Number(response_data[cur][demographic.demographic_full]) > 0 ? Number(response_data[cur][demographic.demographic_full]) : 0), 0),
                      }, 
                      ...response_data.map(row => ({
                        [row["Responses"]]:
                          row[demographic.demographic_full]
                      }))
                    )
                  )
                ]
              })
            })
            .reduce((acc,cur) => acc.concat(cur),[])
      })}
    );
  }

  handleFilterDemographicChange(demographic) {
    this.setState({filter_demographic: demographic})
  }

  handleFilterFindingChange(finding) {
    this.setState({filter_finding: finding})
  }

  render() {
    const filter_demographic = this.state.filter_demographic;
    const filter_finding = this.state.filter_finding;

    let data_is_filtered = filter_demographic != this.total_demographic;
    let selected_finding = this.props.data.findings.find(d => d.finding_short == filter_finding);
    let finding_questions = this.props.data.finding_questions
      .filter(d => d.finding == filter_finding)
      .map(finding_question => finding_question.question_number);
    let questions = this.questions
      .filter(q => 
        finding_questions.includes(q.question_number)
        || finding_questions.includes(q.question_specific)
      );
    let last_question;
      
    return (
      <ChartContainer className="dv-chart">
        <div className="dv-chart__column">
          <p>
            Filter by 
            <Select
              onChange={this.handleFilterDemographicChange}
              options={this.props.data.demographic_keys.map(d => d.demographic_key)}
            />
          </p>
          <ButtonGroup
            onChange={this.handleFilterFindingChange}
            options={this.props.data.findings.map(d => ({id: d.finding_short, text: d.finding_title}))}
            active={this.props.data.findings[0].finding_short}
          />
        </div>
        <div className="dv-chart__column">
          <h1>{selected_finding.finding_title}</h1>
          {questions.map((q) => {
            let is_new_question = q.content_general != last_question;
            last_question = q.content_general; 

            let demographics = q.demographic_keys.find(d => d.demographic_key == filter_demographic).demographics.filter(d => d.demographic_total > 0).reverse();
            demographics = data_is_filtered ? demographics.concat(q.total) : demographics;
            let number_of_bars = demographics.length;
            let filtered_data_unavailable = data_is_filtered && number_of_bars == 1;

            let keys = Object.keys(demographics[0]).filter(key => 
              key != "demographic_value" 
              && key != "demographic_total" 
            );
            let colorset = q.colorset ? colorsets[q.colorset] : colorsets.unordered;

            let demographics_percent = demographics.map(d => 
              Object.assign(...Object.keys(d).map(key => 
                ({
                  [key]: 
                    keys.includes(key) 
                    ? Math.trunc(10000 * d[key] / d.demographic_total) / 100
                    : d[key]
                })
              ))
            );

            return (
            <div>
              {is_new_question && (<h2>{q.content_general}</h2> )}
              {q.content_specific && (<h3>{q.content_specific}</h3>)}
              {filtered_data_unavailable && (<p>{this.filtered_data_unavailable_text}</p>)}
              <Chart
                maxWidth={650}
                height={(93 * number_of_bars) + 71}
                renderTooltip={({ datum }) => (
                  <div style={{ display: "flex" }}>
                    <strong style={{ marginRight: "0.7em" }}>{datum.key}</strong>
                    <span>{(datum.bar.data[datum.key] < 1 && datum.bar.data[datum.key]) > 0 ? "<1" : Math.round(datum.bar.data[datum.key])}%</span>
                  </div>
                )}
              >
                {props => (
                  <HorizontalStackedBar
                    data={demographics_percent}
                    y={d => d.demographic_value}
                    keys={keys}
                    colors={colorset.slice(0, keys.length - 3).concat(colorsets.base)}
                    {...props}
                  />
                )}
              </Chart>
              <small>
                {data_is_filtered
                ? (<span>n = {q.total[0].demographic_total}</span>)
                : demographics
                  .map(d => (<span><strong>{d.demographic_value}</strong> n = {d.demographic_total} </span>))
                }
              </small>
            </div>
          )})}
        </div>
      </ChartContainer>
    );
  }
}