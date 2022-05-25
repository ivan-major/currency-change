import React from 'react';
import './Select.css';

const currencySelectItems = [
  {
    curr: 'UAH',
    flag: './img/flag/UAH.png',
  },

  {
    curr: 'USD',
    flag: './img/flag/USD.png',
  },

  {
    curr: 'EUR',
    flag: './img/flag/EUR.png',
  },
];

export class Select extends React.Component {
  state = {
    isOpen: false,
    selectFlag: this.props.flag,
  };

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  render() {
    const { value, onChange, name } = this.props;
    const { isOpen, selectFlag } = this.state;

    return (
      <div className="select">
        <button
          type="button"
          onClick={this.toggle}
          className="select__button"
        >
          <div className="select__text">{value}</div>
          <img src={selectFlag} alt="flag" className="select__flag" />
          <img src="./img/arrow.svg" alt="arrow" />
        </button>

        {isOpen && (
          <ul className="select__items">
            {currencySelectItems.map(curr => (
              <li
                key={curr.curr}
                id={name}
                className="select__item"
                onClick={(event) => {
                  this.setState({
                    selectFlag: curr.flag,
                  });
                  onChange(curr, event.currentTarget.id);
                  this.toggle();
                }}
              >
                <div>{curr.curr}</div>
                <img src={curr.flag} alt="flag" className="select__flag" />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
