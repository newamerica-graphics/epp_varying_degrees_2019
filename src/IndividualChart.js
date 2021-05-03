import React from "react";
import { ChartContainer } from "@newamerica/meta";
import CustomChart from "./CustomChart";

export default class IndividualChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let last_question;
    return (
      <ChartContainer className="dv-individual-chart">
        {this.props.questions.map(q => {
          let is_new_question = q.content_general != last_question;
          last_question = q.content_general; 
          return (
            <CustomChart
              question={q}
              display_full_question={is_new_question}
              filter_demographic={this.props.filter_demographic}
              total_demographic={this.props.total_demographic}
              filtered_data_unavailable_text={this.props.filtered_data_unavailable_text}
              list_of_nonanswers = {this.props.list_of_nonanswers}
              background_color="grey"
              className="custom-chart--individual-chart"
            />
          );
        })}
        <h4 className="logo-text">New America</h4>
      </ChartContainer>
    );
  }
}
