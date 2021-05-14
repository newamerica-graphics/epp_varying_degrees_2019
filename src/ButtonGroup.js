import React from "react";
import PropTypes from "prop-types";

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ active: e.target.id }, () =>
      this.props.onChange(this.state.active)
    );
  }

  render() {
    const { options, style, className } = this.props;
    const { active } = this.state;
    return (
      (style == "ol") ?
      <ol className={`dv-button-group ${style && `dv-button-group--${style}`} ${className}`} role="group">
        {options.map(option =>
          <li className={`dv-button-group__li ${active === option.id ? "dv-button-group__li--active" : ""}`}>
              <a
                type="button"
                href="#"
                className={`dv-button-group__button ${active === option.id ? "dv-button-group__button--active" : ""}`}
                onClick={this.handleClick}
                id={option.id}
              >
                {option.text}
              </a>
          </li>
        )}
      </ol>
      : <div className={`dv-button-group ${this.props.className}`} role="group">
        {options.map(option => 
          <button
            type="button"
            className={`dv-button-group__button ${active === option.id ? "dv-button-group__button--active" : ""}`}
            onClick={this.handleClick}
            id={option.id}
          >
            {option.text}
          </button>
        )}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  /**
   * This function will receive the currently selected button's id
   */
  onChange: PropTypes.func.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ButtonGroup;
