import React from "react";
import { Chart, HorizontalStackedBar } from "@newamerica/charts";
import { ButtonGroup, Select } from "@newamerica/components";
import { ChartContainer } from "@newamerica/meta";
import { colors } from "./lib/colors";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_demographic: 'Total',
      filter_finding: 'jobs',
    };

    this.handleFilterDemographicChange = this.handleFilterDemographicChange.bind(this);
    this.handleFilterFindingChange = this.handleFilterFindingChange.bind(this);

    this.data = this.props.data.answers;
    this.comparison_demographic = this.props.data.meta[0].comparison_demographic;
    this.total_demographic = this.props.data.meta[0].demographic_key_for_total;

    /*
    This is the format for the new questions data object:
    {
      question_number: "2A",
      content: "To the best of your knowledge, do you believe people with the following levels of education earn more, less, or about the same as those who did not receive any education beyond high school? - Some technical education or college, but no degree",
      total: { // this is for comparison
         demographic_value: "2019",
        "Much more": "2%", // "Response" for the first value
        "Somewhat": "5%",  // same as the previous, for an arbitrary number of responses
        ...
      }
      demographic_keys: [
        {
          demographic_key: "Total",
          demographic_total: 5023,
          demographics: [
            demographic_value: "2019",
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
        d["Q Number"] == q.question_number 
      );
      return ({
        question_number: q.question,
        question_specific: q.question_number,
        content_general: q.content_general,
        content_specific: q.content_specific,
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

    let selected_finding = this.props.data.findings.find(d => d.finding_short == filter_finding);
    let question_group = this.props.data.question_groups
      .filter(d => d.finding == filter_finding)
      .map(finding_question => finding_question.question_number);
    let questions = this.questions
      .filter(q => 
        question_group.includes(q.question_number)
        || question_group.includes(q.question_specific)
      );
    let last_question;
      
    return (
      <ChartContainer>
        <ButtonGroup
          onChange={this.handleFilterFindingChange}
          options={this.props.data.findings.map(d => ({id: d.finding_short, text: d.finding_title}))}
          active={this.props.data.findings[0].finding_short}
        />
        <p>
          Filter by 
          <Select
            onChange={this.handleFilterDemographicChange}
            options={this.props.data.demographic_keys.map(d => d.demographic_key)}
          />
        </p>
        <h1>{selected_finding.finding_title}</h1>
        <h3>Filtered by {filter_demographic}</h3>
        <p>{selected_finding.finding_description}</p>
        {questions.map((q) => {
          let is_new_question = q.content_general != last_question;
          last_question = q.content_general; 
          return (
          <div>
            {is_new_question && (<h2>{q.content_general}</h2> )}
            {q.content_specific && (<h3>{q.content_specific}</h3>)}
            <Chart
              maxWidth={650}
              height={350}
              renderTooltip={({ datum }) => (
                <div style={{ display: "flex" }}>
                  <span style={{ paddingRight: "3px" }}>{datum.key}: </span>
                  <span>{Math.round(datum.bar.data[datum.key])}%</span>
                </div>
              )}
            >
              {props => {
                let demographics = q.demographic_keys.find(d => d.demographic_key == filter_demographic).demographics;
                demographics = filter_demographic == this.total_demographic ? demographics : q.total.concat(demographics);
                
                let keys = Object.keys(demographics[0]).filter(key => 
                  key != "demographic_value" 
                  && key != "demographic_total" 
                );

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
                  <HorizontalStackedBar
                    data={demographics_percent.reverse()}
                    y={d => d.demographic_value}
                    keys={keys}
                    colors={[
                      colors.turquoise.dark,
                      colors.turquoise.medium,
                      colors.red.light,
                      colors.red.dark,
                      colors.blue.light,
                      colors.blue.very_light,
                      colors.blue.light,
                      colors.blue.light,
                    ]}
                    {...props}
                  />
                )
              }}
            </Chart>
          </div>
        )})}
      </ChartContainer>
    );
  }
}