import React from "react";
import { ChartContainer, Title } from "@newamerica/meta";
import { Chart, HorizontalStackedBar } from "@newamerica/charts";
import { colors } from "./lib/colors";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    /*
    This is the format:
    {
      question_number: "2A",
      content: "To the best of your knowledge, do you believe people with the following levels of education earn more, less, or about the same as those who did not receive any education beyond high school? - Some technical education or college, but no degree",
      demographics: [
        {
          demographic_key: "Total",
          demographic_value: "2019",
          "Much more": "2%", // "Response" for the first value
          "Somewhat": "5%",  // same as above, for an arbitrary number of responses
          ...
        },
        ...
      ]
    },
    ...
    */

    this.questions = this.props.questions
    // .filter(d => d.question_number == "2A") // can filter to one question so it's quicker to load
    .map(q => {
      let q_data = this.props.data.filter(d => 
        d["Q Number"] == q.question_number 
      );
      return ({
        question_number: q.question_number,
        content: q.content,
        demographics: [
          ...Object.keys(this.props.demographic_values)
          .map(value => {
            let demographic_full = this.props.demographic_values[value].demographic_full;
            return (
              Object.assign(
                {
                  demographic_key: this.props.demographic_values[value].demographic_key,
                  demographic_value: this.props.demographic_values[value].demographic_value,
                }, 
                ...Object.keys(q_data)
                .filter(d => 
                  q_data[d]["Responses"] 
                  && !q_data[d]["Responses"].includes("(NET)")
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


  render() {
    return (
      <ChartContainer>
        {this.questions.map(
          q => (
            <div>
              <Title>{q.question_number}: {q.content}</Title>
              {this.props.demographic_keys
              .map(chart_demographic => (
                <div>
                  <Title>{chart_demographic.demographic_key}</Title>
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
                          data={q.demographics.filter(d => d.demographic_key == chart_demographic.demographic_key)}
                          y={d => d.demographic_value}
                          keys={Object.keys(q.demographics.filter(d => d.demographic_key == chart_demographic.demographic_key)[0]).filter(key => 
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

                  {/* Show data in a list for testing purposes */}
                  {/* <ul>
                    {q.demographics
                    .filter(d => d.demographic_key == chart_demographic.demographic_key)
                    .map(d => (
                      <li>
                        {d.demographic_value}
                        <ul>
                          {Object.keys(d)
                          .filter(key => 
                            key != "demographic_key" 
                            && key != "demographic_value" 
                          )
                          .map(key => (
                            <li>{key}: {d[key]}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul> */}
                </div>
              ))}
            </div>
          )
        )}
      </ChartContainer>
    );
  }
}