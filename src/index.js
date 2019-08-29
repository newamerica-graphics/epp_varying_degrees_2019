import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import CustomChart from "./CustomChart";
import './index.sass';

let queue = [];
let data = null;
let comparison_demographic = null;
let total_demographic = null;
let filtered_data_unavailable_text = null;
let questions = null;

const settings = {
  'dashboard': el => {
    ReactDOM.render(
      [
        <Dashboard
          data={data}
          questions={questions}
          comparison_demographic={comparison_demographic}
          total_demographic={total_demographic}
          filtered_data_unavailable_text={filtered_data_unavailable_text}
        />
      ],
      el
    )
  },
  'individual_test': el => {
    ReactDOM.render(
      [
        <CustomChart
          question={questions.find(d => d.question_specific == "2B")}
          filter_demographic="Education"
          total_demographic="Total"
          filtered_data_unavailable_text={filtered_data_unavailable_text}
          individual={true}
        />
      ],
      el
    )
  },
};

fetch('https://na-data-sheetsstorm.s3.us-west-2.amazonaws.com/prod/epp/varying_degrees_2019.json').then(response => response.json()).then((_data)=>{
  data = _data;
  comparison_demographic = data.meta[0].comparison_demographic;
  total_demographic = data.meta[0].demographic_key_for_total;
  filtered_data_unavailable_text = data.meta[0].filtered_data_unavailable_text;
  questions = data.questions
  .map(q => {
    let q_data = data.data.filter(d => 
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
              Object.keys(q_data).reduce((acc,cur) => acc + (Number(q_data[cur][comparison_demographic]) > 0 ? Number(q_data[cur][comparison_demographic]) : 0), 0),
          }, 
          ...q_data.map(row => ({
            [row["Responses"]]:
              row[comparison_demographic]
          }))
        )
      ],
      demographic_keys: 
        data.demographic_keys
          .map(key => {
            let demographic_values = data.demographic_values.filter(d => d.demographic_key == key.demographic_key);
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
    })
  });
  for(let i=0; i<queue.length; i++)
    queue[i]();
});

window.renderDataViz = function(el){
  let id = el.getAttribute('id');
  let chart = settings[id];
  if(!chart) return;

  if(data){
    chart(el);
  } else {
    queue.push(() => chart(el));
  }
}


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