import React from "react";
import { ButtonGroup, Select } from "@newamerica/components";
import { ChartContainer } from "@newamerica/meta";
import CustomChart from "./CustomChart";

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
    let selected_finding = this.props.data.findings.find(d => d.finding_short == this.state.filter_finding);
    let finding_questions = this.props.data.finding_questions
      .filter(d => d.finding == this.state.filter_finding)
      .map(finding_question => finding_question.question_number);
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
          {this.questions.map((q) => {
            let is_new_question = q.content_general != last_question;
            last_question = q.content_general; 

            return (
              <div>
                {(finding_questions.includes(q.question_number) || finding_questions.includes(q.question_specific)) && 
                  <CustomChart
                    question={q}
                    display_full_question={is_new_question}
                    filter_demographic={this.state.filter_demographic}
                    total_demographic={this.total_demographic}
                    onFilterDemographicChange={this.handleFilterDemographicChange}
                  />
                }
              </div>
            )
          })}
        </div>
      </ChartContainer>
    );
  }
}