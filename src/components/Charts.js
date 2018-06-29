import React from 'react';
import colors from '../colors';
import { BarChart, Bar, XAxis, YAxis, ReferenceLine, Tooltip, Legend, LabelList, Label, Text, ResponsiveContainer } from 'recharts';
import './Charts.scss';

export default class Charts extends React.Component {
  flattenData = () => {
    let { questions, responses, data } = this.props;
    /*
      from
        {
          q_1 : {
            'Black' : [
              {response_id: 'ease_0', percent: 0.1 }...
            ]
          }
        }
      to
        [
          {
            ...questionDetails,
            groups: [
              { name: 'Black', ease_0: 0.1 ... }
            ]
          }
        ]
    */
    return Object.keys(data).map((questionId,i)=>{
      let total = 0;
      let groups = Object.keys(data[questionId]).map((demographicKey)=>{
        let response = data[questionId][demographicKey].sort((a,b) => (
          responses[a.response_id].order - responses[b.response_id].order
        )).filter((d)=>{
          if(demographicKey.indexOf('Total')==-1) total += d.number;
          if(d.response_id.indexOf('not_fine')===-1) return true;
          let valid = ["not_fine_15","not_fine_7","not_fine_8","not_fine_1","not_fine_10","not_fine_18"];
          return valid.indexOf(d.response_id) !== -1
        }).map((d)=>(
          { [d.response_id]: d.percent }
        ));
        return Object.assign({ name: demographicKey }, ...response);
      });
      // HACK move 2017 to top
      let _2018 = groups[0];
      groups[0] = groups[1];
      groups[1] = _2018;
      return {...questions[questionId], total, groups }
    });
  }

  getColor = (k) => {
    let { responses } = this.props;
    let color = responses[k].color;
    return colors[color];
  }

  getResponseName = (k) => {
    let { responses } = this.props;
    return responses[k].response;
  }

  bars = (group) => {
    let bars = Object.keys(group).filter((k)=> k!= 'name' ).map((k,i)=>(
      <Bar dataKey={k}
        stackId="a"
        layout="vertical"
        barSize={34}
        fill={this.getColor(k)}
        key={`${k}`}
        isAnimationActive={false}>
        <LabelList dataKey={k} position="insideLeft"
              formatter={(v) => v < 0.06 ? '' : `${Math.round(v*1000)/10}%`}
            />
      </Bar>
    ));

    if(group.name == '2017 Total' && group[Object.keys(group)[1]] == '' ){
      bars.push(<ReferenceLine y={'2017 Total'} key='no-data' label="No data for 2017" strokeDasharray="3 3" />);
    }

    return bars;
  }

  referenceLine = (name,i) => (
    <ReferenceLine y={name} key={`ref-${i}`} transform="translate(0,22)"/>
  )

  render(){
    let { questions, scrollToCharts } = this.props;
    let data = this.flattenData().sort((a,b) => a.order - b.order);
    return (
      <div className="charts">
        <div className="scroll-to-charts" onClick={scrollToCharts}><i className="fa fa-arrow-up" /></div>

        {data.map((question, i)=>(
          <div className="charts__chart" key={`${question.question_id}`} style={{position: 'relative', zIndex: data.length-i}}>
            {(question.parent_question!='' && question.order%1==0) &&
              <p className="chart__question margin-top-0" dangerouslySetInnerHTML={{__html: question.parent_question}} />
            }
            <p className="chart__question" dangerouslySetInnerHTML={{__html: question.parent_question!='' ? question.question : question.full_question}} />
            <BarChart width={650}
              height={question.groups.length*44 + 10 + 1}
              layout="vertical"
              barCategoryGap={10}
              data={question.groups}
              margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                <ReferenceLine y={question.groups[0].name} transform="translate(0,-22)" x1="0" x2="650" />
                <ReferenceLine y={question.groups[0].name} transform="translate(-530,-22)" x1="0" x2="650" />
                {question.groups.map((g,i)=>(
                  this.referenceLine(g.name, i)
                ))}
                <Tooltip
                  formatter={(value, key)=> `${this.getResponseName(key)}: ${Math.round(value*1000)/10}%`}
                />
               {this.bars(question.groups[0])}
               <XAxis hide
                 orientation="top"
                 tick={false}
                 type="number"
                 height={1}
                 domain={[0,1]}/>
               <YAxis dataKey="name"
                 type="category"
                 tick={{ textAnchor: 'start', fontSize: '14px' }}
                 tickMargin={-1}
                 tickLine={{ transform: "translate(0,22)" }}
                 axisLine={false}
                 tickSize={120}
                 width={120}
               />
            </BarChart>
            {question.total==0 && <label class="gray margin-top-0 total">(n=1450)</label>}
            {question.total!==0 && <label class="gray margin-top-0 total">(n={question.total})</label>}
            {question.question_id===11 &&
              <label className="block margin-top-15">*Top 6 responses overall. Responses by demographic might be different than what appears here.</label>
            }
          </div>
        ))}
      </div>
    );
  }
}
