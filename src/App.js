import React from 'react';
import { nest } from 'd3';
import QuestionGroups from './components/QuestionGroups';
import Charts from './components/Charts';
import './App.scss';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  generateInitialState = (data) => {
    let questionGroups = {};
    for(let k in data.metaData.question_id){
      let q = data.metaData.question_id[k];
      let label = q.group;
      let order = q.group_order
      if(!questionGroups[label]) questionGroups[label] = {label, order, ids: []};
      questionGroups[label].ids.push(q.question_id);
    }

    return {
      questionGroups,
      responses: data.metaData.response_id,
      questions: data.metaData.question_id,
      data: data.data,
      isFetching: false,
      activeQuestionIds: this.props.questionIds,
      activeDemographic: null,
      activeQuestionGroup: this.props.questionGroup
    };
  }

  toggleQuestionGroups = (q, key) => {

    let qry = {
      question_id__in: q.ids,
      demographic_key__in: [this.state.activeDemographic, 'Total'] || ['Total'],
      group_by: ['question_id', 'demographic_value']
    }

    this.fetchData(qry, (data)=>{
      this.setState({
        data: data.data,
        isFetching: false,
        activeQuestionGroup: key,
        activeQuestionIds: q.ids
      });
    });
  }

  toggleDemographic = (demo) => {
    let qry = {
      question_id__in: this.state.activeQuestionIds,
      demographic_key__in: [demo, 'Total'] || ['Total'],
      group_by: ['question_id', 'demographic_value']
    }

    this.fetchData(qry, (data)=>{
      this.setState({
        data: data.data,
        isFetching: false,
        activeDemographic: demo
      });
    });

  }

  scrollToCharts = () => {
    if(!this.el) return;
    let scrollTop = this.el.parentElement.getBoundingClientRect().top + (window.pageYOffset || window.scrollY);
    window.scrollTo(0,scrollTop-90);
  }

  fetchData = (qry={}, cb=()=>{}) => {
    let url = new URL('https://chart-studio.herokuapp.com/api/v1/projects/5b04194ca5783e1275b0ab89/data');
    for(let k in qry){
      if(qry[k] instanceof Array)
        qry[k].forEach((q)=> url.searchParams.append(`${k}[]`, q));
      else
        url.searchParams.append(k, qry[k])
    }
    this.scrollToCharts();
    this.setState({ isFetching: true });
    fetch(url.toString())
      .then((res)=>(
        res.json()
      )).then((data)=>{
        cb(data);
      });
  }

  componentWillMount(){
    let qry = {
      question_id__in: this.props.questionIds,
      demographic_key__in: ['Total'],
      group_by: ['question_id', 'demographic_value'],
      metadata: true
    }

    this.fetchData(qry, (data)=>{
      let initState = this.generateInitialState(data);
      this.setState(initState);
    });
  }

  render(){
    return(
      <div className="varying-degrees-2018 full-app scroll-target" data-scroll-bottom-offset="-100vh" ref={(el)=>{this.el = el;}}>
        {this.state.data && <div className="row">
          <div className="col-12 col-lg-4 toggles-wrapper">
            {this.state.isFetching && <div className="blur" />}
          <QuestionGroups
            questionGroups={this.state.questionGroups}
            activeQuestionGroup={this.state.activeQuestionGroup}
            toggleQuestionGroups={this.toggleQuestionGroups}
            toggleDemographic={this.toggleDemographic} />
          </div>
          <div className="col-12 col-lg-8 charts-wrapper">

          {!this.state.isFetching && <Charts questions={this.state.questions}
              responses={this.state.responses}
              scrollToCharts={this.scrollToCharts}
              data={this.state.data} />}
          </div>
        </div>}
      </div>
    );
  }
}
