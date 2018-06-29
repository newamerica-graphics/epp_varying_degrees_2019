import React from 'react';
import './Filters.scss';

export default class Filters extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: null,
      options: ["Gender","Education Level","Generation","Region","North Carolina","Race","Political Ideology","Urbanicity","Student Status","Occupation","Income","Parent Status","Party ID"]
    }
  }

  change = (e) => {
    let { toggleDemographic } = this.props;
    this.setState({ value: e.target.value });
    toggleDemographic(e.target.value);
  }
  render(){

    return (
      <div className="filters">
        <form>
          <label className="button--text margin-0 block">Group by demographic</label>
          <div className="select-wrapper">
          <select onChange={this.change}>
              <option value={null}>Total</option>
              {this.state.options.map((o,i)=>(
                <option value={o} key={i}>{o}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    );
  }
}
