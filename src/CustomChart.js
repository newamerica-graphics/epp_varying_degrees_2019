import React from "react";
import { Chart, HorizontalStackedBar } from "@newamerica/charts";
import { colorsets } from "./lib/colorsets";

export default class CustomChart extends React.Component {
  constructor(props) {
    super(props);

    this.question = this.props.question;
    this.display_full_question = this.props.display_full_question;
    this.filtered_data_unavailable_text = this.props.filtered_data_unavailable_text;
    this.total_demographic = this.props.total_demographic;

    this.handleFilterDemographicChange = this.handleFilterDemographicChange.bind(this);
  }

  handleFilterDemographicChange(e) {
    this.props.onFilterDemographicChange(e.target.value);
  }

  render() {
    const filter_demographic = this.props.filter_demographic;

    let data_is_filtered = filter_demographic != this.total_demographic;
    let demographics = this.question.demographic_keys
      .find(d => d.demographic_key == filter_demographic)
      .demographics
      .filter(d => d.demographic_total > 0)
      .reverse();
    demographics = data_is_filtered ? demographics.concat(this.question.total) : demographics;
    let number_of_bars = demographics.length;
    let filtered_data_unavailable = data_is_filtered && number_of_bars == 1;

    let keys = Object.keys(demographics[0]).filter(key => 
      key != "demographic_value" 
      && key != "demographic_total" 
    );
    let colorset = this.question.colorset ? colorsets[this.question.colorset] : colorsets.unordered;

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
        {this.display_full_question && 
          <div>
            <h2>{this.question.content_general}</h2>
            <ul className="legend">
              {keys.map((key, i) => {
                let color = colorset.slice(0, keys.length - 3).concat(colorsets.base)[i];
                return (
                  i < keys.length - 3 &&
                  <li 
                  className="legend__item"
                  style={{borderColor: color, backgroundColor: color}}
                  >
                    {key}
                  </li>
                );
              })}
            </ul>
          </div>
        }
        {this.question.content_specific &&
          <h3>{this.question.content_specific}</h3>
        }
        {filtered_data_unavailable &&
          <p>{this.filtered_data_unavailable_text}</p>
        }

        {/* Map out values */}
        {/* <ul>
          {demographics_percent.map(d => 
            <li>
              {d.demographic_value}
              <ul>
                {keys.map(key => 
                  <li><strong>{key}</strong> {d[key]}</li>  
                )}
              </ul>
            </li>
          )}
        </ul> */}

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
          ? (<span>n = {this.question.total[0].demographic_total}</span>)
          : demographics
            .map(d => (<span><strong>{d.demographic_value}</strong> n = {d.demographic_total} </span>))
          }
        </small>
      </div>
    );
  }
}
