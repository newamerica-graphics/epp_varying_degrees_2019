import React from "react";
import { ButtonGroup, Select } from "@newamerica/components";
import { ChartContainer } from "@newamerica/meta";
import CustomChart from "./CustomChart";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_demographic: this.props.total_demographic,
      filter_finding: this.props.data.findings[0].finding_short,
    };

    this.handleFilterDemographicChange = this.handleFilterDemographicChange.bind(this);
    this.handleFilterFindingChange = this.handleFilterFindingChange.bind(this);

    this.data = this.props.data;
    this.meta = this.data.meta[0];
    this.finding_questions = this.props.data.finding_questions
    this.questions = this.props.questions;
    this.comparison_demographic = this.props.comparison_demographic;
    this.total_demographic = this.props.total_demographic;
    this.filtered_data_unavailable_text = this.props.filtered_data_unavailable_text;
    this.filter_heading = this.meta.filter_heading;
    this.findings_heading = this.meta.findings_heading;
  }

  handleFilterDemographicChange(demographic) {
    this.setState({filter_demographic: demographic})
  }

  handleFilterFindingChange(finding) {
    this.setState({filter_finding: finding})
  }

  render() {
    let selected_finding = this.props.data.findings.find(d => d.finding_short == this.state.filter_finding);
    let finding_questions = this.finding_questions
      .filter(d => d.finding == this.state.filter_finding)
      .map(finding_question => finding_question.question_number);
    let last_question;

    window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"])for(var e in a.data["datawrapper-height"]){var t=document.getElementById("datawrapper-chart-"+e)||document.querySelector("iframe[src*='"+e+"']");t&&(t.style.height=a.data["datawrapper-height"][e]+"px")}}))
      
    return (
      <div className="dv-dashboard-wrapper">
        <h2>{this.meta.dashboard_title}</h2>
        <ChartContainer className="dv-dashboard">
          <div className="dv-dashboard__column">
            <nav className="dashboard-nav">
              <label>
                <h4 className="dashboard-nav__heading dashboard-nav__heading--first">{this.filter_heading}</h4>
              </label>
              <Select
                onChange={this.handleFilterDemographicChange}
                options={this.props.data.demographic_keys.map(d => d.demographic_key)}
                className="dashboard-nav__select"
              />
              <h4 className="dashboard-nav__heading">{this.findings_heading}</h4>
              <ButtonGroup
                onChange={this.handleFilterFindingChange}
                options={this.props.data.findings.map(d => ({id: d.finding_short, text: d.finding_title}))}
                active={this.props.data.findings[0].finding_short}
              />
            </nav>
          </div>
          <div className="dv-dashboard__column">
            <h2>{selected_finding.finding_title}</h2>
            {this.questions.map((q) => {
              if(!finding_questions.includes(q.number_specific)) return;

              let is_new_question = q.content_general != last_question;
              last_question = q.content_general;

              if (q.datawrapper_code) {
                return(
                  <div className={`datawrapper-chart ${!is_new_question && "custom-chart--partial-chart"}`}>
                    {is_new_question && 
                      <h3 className="custom-chart__title">{q.content_general}</h3>
                    }
                    {q.content_specific && 
                      <h4 className="custom-chart__title custom-chart__title--specific">{q.content_specific}</h4>
                    }
                    {this.state.filter_demographic != this.props.total_demographic
                      ?
                      <p class="custom-chart__message">{this.filtered_data_unavailable_text}</p>
                      :
                      <div>
                        <iframe aria-label="Chart" id={`datawrapper-chart-${q.datawrapper_code}`} src={`https://datawrapper.dwcdn.net/${q.datawrapper_code}/`} scrolling="no" frameborder="0" style={{width: 0, minWidth: "100%", border: "none"}} height="800"></iframe>
                        <small className="n-value">
                          n = {q.n_size}
                        </small>
                      </div>
                    }
                  </div>
                );
              }

              return (
                <CustomChart
                  question={q}
                  display_full_question={is_new_question}
                  filter_demographic={this.state.filter_demographic}
                  total_demographic={this.total_demographic}
                  filtered_data_unavailable_text={this.filtered_data_unavailable_text}
                  onFilterDemographicChange={this.handleFilterDemographicChange}
                  list_of_nonanswers = {this.props.list_of_nonanswers}
                />
              )
            })}
          </div>
        </ChartContainer>
      </div>
    );
  }
}