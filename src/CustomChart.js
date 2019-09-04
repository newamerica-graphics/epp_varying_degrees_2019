import React from "react";
import { Chart } from "@newamerica/charts";
import HorizontalStackedBar from "./HorizontalStackedBar";
import { colorsets } from "./lib/colorsets";

export default class CustomChart extends React.Component {
  constructor(props) {
    super(props);

    this.question = this.props.question;
    this.display_full_question = this.props.display_full_question;
    this.filtered_data_unavailable_text = this.props.filtered_data_unavailable_text;
    this.total_demographic = this.props.total_demographic;
    this.number_of_meta_keys = 2; // demographic_value and demographic_total
    this.number_of_nonanswers = 3 // "DON'T KNOW", "SKIPPED ON WEB", "REFUSED" // TODO don't hard code

    this.handleFilterDemographicChange = this.handleFilterDemographicChange.bind(this);
  }

  handleFilterDemographicChange(e) {
    this.props.onFilterDemographicChange(e.target.value);
  }

  render() {
    const filter_demographic = this.props.filter_demographic;

    let data_is_filtered = filter_demographic != this.total_demographic;
    let margin_left = data_is_filtered ? 120 : 60;

    let demographics = this.question.demographic_keys
      .find(d => d.demographic_key == filter_demographic)
      .demographics
      .filter(d => d.demographic_total > 0)
      .reverse();
    demographics = data_is_filtered ? demographics.concat(this.question.total) : demographics;
    let number_of_bars = demographics.length;
    let filtered_data_unavailable = data_is_filtered && number_of_bars == 1;

    let keys = Object.keys(demographics[0]).slice(this.number_of_meta_keys);
    let chart_keys = keys;

    let number_of_keys = keys.length;
    let number_of_nonanswers = this.number_of_nonanswers;
    let number_of_answers = number_of_keys - number_of_nonanswers;
    
    let colorset_name = this.question.colorset;
    let { colorset, legend_keys, legend_colorset, chart_colorset } = [];
    let nonanswers = keys.slice(number_of_answers);
    
    if (colorset_name.includes("diverging")) {
      let index_positive_min = 0;
      let index_positive_max, index_neutral_min, index_neutral_max, index_negative_min, index_negative_max, 
          has_neutral,
          answers_neutral;

      colorset = colorsets["diverging"];

      if ( colorset_name == "diverging" ) {
        has_neutral = false;
        legend_colorset = colorset.positive.concat(colorset.negative);
        chart_colorset = colorset.positive.concat(colorsets.base, colorset.negative);
        index_positive_max = number_of_answers / 2;
        index_negative_min = number_of_answers / 2;
        index_negative_max = number_of_answers;
      } else if ( colorset_name == "diverging_neutral_center" ) {
        has_neutral = true;
        index_positive_max = (number_of_answers - 1) / 2;
        index_neutral_min =  (number_of_answers - 1) / 2;
        index_neutral_max =  (number_of_answers + 1) / 2;
        index_negative_min = (number_of_answers + 1) / 2;
        index_negative_max = number_of_answers;
      } else if ( colorset_name == "diverging_neutral_last" ) {
        has_neutral = true;
        index_positive_max = (number_of_answers - 1) / 2;
        index_negative_min = (number_of_answers - 1) / 2;
        index_negative_max = number_of_answers - 1;
        index_neutral_min =  number_of_answers - 1;
        index_neutral_max =  number_of_answers;
      }

      let colors_positive = colorset.positive.slice(index_positive_min, index_positive_max).reverse();
      let colors_negative = colorset.negative.slice(index_positive_min, index_positive_max);
      let answers_positive = keys.slice(index_positive_min, index_positive_max);
      let answers_negative = keys.slice(index_negative_min, index_negative_max);

      if ( !has_neutral ) {
        legend_colorset = colors_positive.concat(colors_negative);
        chart_colorset = colors_positive.concat(colorsets.base, colors_negative);

        legend_keys = answers_positive.concat(answers_negative);
        chart_keys = answers_positive.concat(nonanswers, answers_negative);
      } else {
        legend_colorset = colors_positive.concat(colorset.neutral, colors_negative);
        chart_colorset = colors_positive.concat(colorset.neutral, colorsets.base, colors_negative);

        answers_neutral = keys.slice(index_neutral_min, index_neutral_max);
        legend_keys = answers_positive.concat(answers_neutral, answers_negative);
        chart_keys = answers_positive.concat(answers_neutral, nonanswers, answers_negative);
      }
    } else {
      if (colorset_name.includes("scale")) {
        colorset = colorsets["scale"]
      } else {
        colorset = colorset_name ? colorsets[colorset_name] : colorsets.unordered;
      }

      legend_colorset = colorset.slice(0, number_of_answers);
      if ( colorset_name == "scale_decreasing") {
        legend_colorset = legend_colorset.reverse();
      }
      
      chart_colorset = legend_colorset.concat(colorsets.base);
      legend_keys = keys.slice(0, number_of_answers);
    } 

    let demographics_percent = demographics.map(d => 
      Object.assign(...Object.keys(d).map(key => 
        ({
          [key]: 
            chart_keys.includes(key) 
            ? Math.trunc(10000 * d[key] / d.demographic_total) / 100
            : d[key]
        })
      ))
    );

    return (
      <div className={`custom-chart ${this.props.className} ${!this.display_full_question && "custom-chart--partial-chart"}`}>
        {this.display_full_question && 
          <div>
            <h3 className="custom-chart__title">{this.question.content_general}</h3>
            <ul className="legend">
              {legend_keys.map((key, i) => {
                return (
                  <li 
                  className="legend__item"
                  style={{borderColor: legend_colorset[i], backgroundColor: legend_colorset[i]}}
                  >
                    {key}
                  </li>
                );
              })}
            </ul>
          </div>
        }
        {this.question.content_specific &&
          <h4 className="custom-chart__title custom-chart__title--specific">{this.question.content_specific}</h4>
        }
        {filtered_data_unavailable &&
          <p class="custom-chart__message">{this.filtered_data_unavailable_text}</p>
        }

        <Chart
          maxWidth={758}
          height={(50 * number_of_bars) + 10}
          renderTooltip={({ datum }) => (
            <div>
              <h4 className="tooltip__title">{datum.bar.data.demographic_value}</h4>
              <table className="tooltip-table">
                {chart_keys.map((key, i) => {
                  let is_positive =  datum.bar.data[key] > 0;
                  return (
                    <tr 
                    className={`tooltip-table__tr ${(!is_positive && "tooltip-table__tr--zero-value")} ${(datum.key == key && "tooltip-table__tr--active")}`}
                    style={is_positive ? {borderColor: chart_colorset[i], backgroundColor: chart_colorset[i]} : {}}
                    >
                      <td className="tooltip-table__td tooltip-table__td--datum">
                        {(is_positive && datum.bar.data[key] < 1) 
                          ? "<1" 
                          : Math.round(datum.bar.data[key])}
                        %
                      </td>
                      <td className="tooltip-table__td tooltip-table__td--key">{key}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          )}
        >
          {props => (
            <HorizontalStackedBar
              data={demographics_percent}
              y={d => d.demographic_value}
              keys={chart_keys}
              colors={chart_colorset}
              margin={{ top: data_is_filtered ? 10 : 0, left: margin_left, right: 0, bottom: 0 }}
              {...props}
            />
          )}
        </Chart>
        <small className="n-value" style={{marginLeft: margin_left}}>
          {(data_is_filtered || number_of_bars == 1)
            ? (<span>n = {this.question.total[0].demographic_total}</span>)
            : demographics.map(d => (
              <span className="n-value__item"><strong>{d.demographic_value}</strong> n = {d.demographic_total}</span>
            ))
          }
        </small>
      </div>
    );
  }
}
