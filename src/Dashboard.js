import React from "react";
import ButtonGroup from "./ButtonGroup";
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
    this.demographics = this.props.data.demographic_keys.filter(d => !d.skip_demographic_key)
    this.finding_questions = this.props.data.finding_questions
  }
  
  handleFilterDemographicChange(demographic) {
    this.setState({filter_demographic: demographic})
  }
  
  handleFilterFindingChange(finding) {
    this.setState({filter_finding: finding})
  }
  
  render() {
    let meta = this.data.meta.filter(col => !this.data.meta[2][col])[0]
    let finding_questions = this.finding_questions
      .filter(d => d.finding == this.state.filter_finding)
      .map(q => q.question_number);
    let previous_question;

    window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"])for(var e in a.data["datawrapper-height"]){var t=document.getElementById("datawrapper-chart-"+e)||document.querySelector("iframe[src*='"+e+"']");t&&(t.style.height=a.data["datawrapper-height"][e]+"px")}}))
      
    return (
      <ChartContainer className="dv-dashboard">
        <nav className="dv-dashboard__column dv-dashboard__column--nav">
          <h2 className="dv-dashboard__nav-title">{meta.dashboard_title}</h2>
          {/* <h4 className="dv-dashboard__nav-heading">{meta.findings_heading}</h4> */}
          <ButtonGroup
            onChange={this.handleFilterFindingChange}
            options={this.props.data.findings.map(d => ({id: d.finding_short, text: d.finding_title}))}
            active={this.state.filter_finding}
            className="dv-button-group--findings"
          />
          <h4 className="dv-dashboard__nav-heading">{meta.filter_heading}</h4>
          <ButtonGroup
            onChange={this.handleFilterDemographicChange}
            options={this.demographics.map(d => ({ id: d.demographic_key, text: d.demographic_key }))}
            active={this.demographics[0].demographic_key}
            className="dv-button-group--filters"
          />
        </nav>
        <div className="dv-dashboard__column dv-dashboard__column--data">
          {/* <h2>{selected_finding.finding_title}</h2> */}
          {this.props.questions.map((q) => {
            if(!finding_questions.includes(q.number_specific)) return;

            let is_new_question = q.content_general != previous_question;
            previous_question = q.content_general;

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
                    <p class="custom-chart__message">{meta.filtered_data_unavailable_text}</p>
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
                meta={meta}
                display_full_question={is_new_question}
                filter_demographic={this.state.filter_demographic}
                total_demographic={this.props.total_demographic}
                onFilterDemographicChange={this.handleFilterDemographicChange}
                list_of_nonanswers = {this.data.meta.filter(e => e.list_of_nonanswers).map(e => e.list_of_nonanswers)}
              />
            )
          })}
        </div>
      </ChartContainer>
    );
  }
}