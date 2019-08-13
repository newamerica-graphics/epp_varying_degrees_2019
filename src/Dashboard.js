import React from "react";
import { Chart, HorizontalStackedBar } from "@newamerica/charts";
import { ButtonGroup, Select } from "@newamerica/components";
import { ChartContainer, Title } from "@newamerica/meta";
import { colors } from "./lib/colors";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_demographic: 'Total',
      filter_finding: 'jobs'
    };

    this.handleFilterDemographicChange = this.handleFilterDemographicChange.bind(this);
    this.handleFilterFindingChange = this.handleFilterFindingChange.bind(this);

    this.comparison_demographic = this.props.data.meta[0].comparison_demographic;
    this.total_demographic = this.props.data.meta[0].demographic_key_for_total;

    /*
    This is the format for the new questions data object:
    {
      question_number: "2A",
      content: "To the best of your knowledge, do you believe people with the following levels of education earn more, less, or about the same as those who did not receive any education beyond high school? - Some technical education or college, but no degree",
      demographics: [
        {
          demographic_key: "Total",
          demographic_value: "2019",
          "Much more": "2%", // "Response" for the first value
          "Somewhat": "5%",  // same as the previous, for an arbitrary number of responses
          ...
        },
        ...
      ]
    },
    ...
    */
    this.questions = this.props.data.questions
    .map(q => {
      let q_data = this.props.data.answers.filter(d => 
        d["Q Number"] == q.question_number 
      );
      return ({
        question_number: q.question_number,
        content: q.content,
        demographics: [
          {
            ...Object.assign( // QUESTION do I need `...Object.assign`
              {
                demographic_key: "Overall",
                demographic_value: "Total",
              }, 
              ...Object.keys(q_data)
                .filter(d => 
                  q_data[d]["Responses"] 
                  && !q_data[d]["Responses"].includes("(NET)") // TODO don't hard code which to skip
                  && !q_data[d]["Responses"].includes("Mean")
                  && !q_data[d]["Responses"].includes("MEDIAN")
                )
                .map(d => {
                  let row = q_data[d];
                  let row_percent = q_data[Number(d)+1];
                  return ({
                    [row["Responses"]]:
                      row[this.comparison_demographic] == 0 || row_percent[this.comparison_demographic] == null
                      ? '0'
                      : row_percent[this.comparison_demographic].trim().slice(0,-1)
                  })}
                )
              )
          },
          ...Object.keys(this.props.data.demographic_values)
          .map(value => {
            let demographic = this.props.data.demographic_values[value];
            let demographic_full = demographic.demographic_full;
            return (
              Object.assign(
                {
                  demographic_key: demographic.demographic_key,
                  demographic_value: demographic.demographic_value,
                }, 
                ...Object.keys(q_data)
                .filter(d => 
                  q_data[d]["Responses"] 
                  && !q_data[d]["Responses"].includes("(NET)") // TODO don't hard code which to skip
                  && !q_data[d]["Responses"].includes("Mean")
                  && !q_data[d]["Responses"].includes("MEDIAN")
                )
                .map(d => {
                  let row = q_data[d];
                  let row_percent = q_data[Number(d)+1];
                  return ({
                    [row["Responses"]]:
                      row[demographic_full] == 0 || row_percent[demographic_full] == null
                      ? '0'
                      : row_percent[demographic_full].trim().slice(0,-1)
                  })}
                )
              )
            )
          })
        ]
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
    let questions = this.questions
      .filter(q => 
        this.props.data.question_groups
          .filter(d => d.finding == filter_finding)
          .map(finding_question => finding_question.question_number)
        .includes(q.question_number)
      );
    return (
      <ChartContainer>
        <ButtonGroup
          onChange={this.handleFilterFindingChange}
          options={this.props.data.findings.map(d => ({id: d.finding_short, text: d.finding_title}))}
          active={this.props.data.findings[0].finding_short}
        />
        <Select
          onChange={this.handleFilterDemographicChange}
          options={this.props.data.demographic_keys.map(d => d.demographic_key)}
        />
        <h2>{selected_finding.finding_title}</h2>
        <h3>Filtered by {filter_demographic}</h3>
        <p>{selected_finding.finding_description}</p>
        {questions.map(q => (
          <div>
            <Title>{q.question_number}: {q.content}</Title>
            <Chart
              maxWidth={650}
              height={350}
              renderTooltip={({ datum }) => (
                <div style={{ display: "flex" }}>
                  <span style={{ paddingRight: "3px" }}>{datum.key}: </span>
                  <span>{datum.bar.data[datum.key]}%</span>
                </div>
              )}
            >
              {props => 
                (
                  <HorizontalStackedBar
                    data={q.demographics
                      .filter(d => d.demographic_key == filter_demographic || (filter_demographic != this.total_demographic && d.demographic_key == "Overall"))
                      .reverse()}
                    y={d => d.demographic_value}
                    keys={Object.keys(q.demographics.filter(d => d.demographic_key == filter_demographic)[0]).filter(key => 
                      key != "demographic_key" 
                      && key != "demographic_value" 
                    )}
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
              }
            </Chart>
          </div>
        ))}
      </ChartContainer>
    );
  }
}