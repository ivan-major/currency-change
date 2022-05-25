import React from 'react';
import { Header } from './components/Header/Header';
import { Select } from './components/Select/Select';
import { getCurrency } from './api/currencyFromServer';
import { Input } from './components/Input/Input';

import './App.css';

class App extends React.Component {
  state = {
    currencies: [],
    selectedCurr1: 'USD',
    inputAmount1: '',
    selectedCurr2: 'UAH',
    inputAmount2: '',
    inputToggle: true,
  };

  componentDidMount() {
    getCurrency()
      .then((currencies) => {
        this.setState({ currencies });
      });
  }

  setAmount1 = (amount) => {
    this.setState(state => ({
      ...state,
      inputAmount1: amount,
    }));
  };

  setCurr1 = (currency) => {
    this.setState(state => ({
      ...state,
      selectedCurr1: currency,
    }));
  };

  setAmount2 = (amount) => {
    this.setState(state => ({
      ...state,
      inputAmount2: amount,
    }));
  };

  setCurr2 = (currency) => {
    this.setState(state => ({
      ...state,
      selectedCurr2: currency,
    }));
  };

  inputToggle = (input) => {
    this.setState(state => ({
      ...state,
      inputToggle: input !== 'currency2',
    }));
  };

  calcAmount = (amount, input, currentCurr, select) => {
    const { currencies, selectedCurr1, selectedCurr2 } = this.state;

    let changeSum = '';
    let currencyFirst = selectedCurr1;
    let currencySecond = selectedCurr2;
    let exchangeUsd = {};
    let exchangeEur = {};

    if (select === 'selectCurr1' && currentCurr !== selectedCurr1) {
      currencyFirst = currentCurr;
    }

    if (select === 'selectCurr2' && currentCurr !== selectedCurr2) {
      currencySecond = currentCurr;
    }

    currencies.forEach((currency) => {
      switch (currency.ccy) {
        case 'USD':
          exchangeUsd = currency;
          break;
        case 'EUR':
          exchangeEur = currency;
          break;
        default:
          break;
      }
    });

    if (currencyFirst === 'USD' && currencySecond === 'UAH') {
      changeSum = input
        ? +amount * exchangeUsd.buy
        : +amount / exchangeUsd.sale;
    }

    if (currencyFirst === 'UAH' && currencySecond === 'USD') {
      changeSum = input
        ? +amount / exchangeUsd.sale
        : +amount * exchangeUsd.buy;
    }

    if (currencyFirst === 'EUR' && currencySecond === 'UAH') {
      changeSum = input
        ? +amount * exchangeEur.buy
        : +amount / exchangeEur.sale;
    }

    if (currencyFirst === 'UAH' && currencySecond === 'EUR') {
      changeSum = input
        ? +amount / exchangeEur.sale
        : +amount * exchangeEur.buy;
    }

    if (currencyFirst === 'EUR' && currencySecond === 'USD') {
      changeSum = input
        ? +amount * exchangeEur.buy / exchangeUsd.sale
        : +amount / exchangeEur.sale * exchangeUsd.buy;
    }

    if (currencyFirst === 'USD' && currencySecond === 'EUR') {
      changeSum = input
        ? +amount * exchangeUsd.buy / exchangeEur.sale
        : +amount / exchangeUsd.sale * exchangeEur.buy;
    }

    if (currencyFirst === currencySecond) {
      changeSum = +amount;
    }

    return +changeSum.toFixed(2);
  };

  render() {
    const {
      currencies,
      selectedCurr1,
      selectedCurr2,
      inputAmount1,
      inputAmount2,
    } = this.state;

    return (
      <div className="App">
        <header className="header">
          <Header currencies={currencies} />
        </header>

        <div className="section">
          <h2 className="section__title">
            Конвертер валют
          </h2>

          <div className="section__block">
            <div className="currency">
              <div className="currency__title">
                Міняю
              </div>

              <div className="currency__block">
                <Input
                  name="currency1"
                  value={inputAmount1}
                  onChange={(event) => {
                    this.setAmount1(event.target.value);
                    this.inputToggle(event.target.name);
                    this.setState(state => ({
                      inputAmount2: this.calcAmount(
                        state.inputAmount1, state.inputToggle,
                      ),
                    }));
                  }}
                />

                <Select
                  name="selectCurr1"
                  flag="./img/flag/USD.png"
                  value={selectedCurr1}
                  onChange={(curr, name) => {
                    this.setCurr1(curr.curr);
                    this.setState(state => ({
                      ...state,
                      inputToggle: false,
                    }));
                    this.setState(state => ({
                      inputAmount1: this.calcAmount(
                        state.inputAmount2,
                        state.inputToggle,
                        curr.curr,
                        name,
                      ),
                    }));
                  }}
                />
              </div>
            </div>

            <div className="currency">
              <div className="currency__title">
                Отримую
              </div>

              <div className="currency__block">
                <Input
                  name="currency2"
                  value={inputAmount2}
                  onChange={(event) => {
                    this.setAmount2(event.target.value);
                    this.inputToggle(event.target.name);
                    this.setState(state => ({
                      inputAmount1: this.calcAmount(
                        state.inputAmount2,
                        state.inputToggle,
                      ),
                    }));
                  }}
                />

                <Select
                  name="selectCurr2"
                  flag="./img/flag/UAH.png"
                  value={selectedCurr2}
                  onChange={(curr, name) => {
                    this.setCurr2(curr.curr);
                    this.setState(state => ({
                      ...state,
                      inputToggle: true,
                    }));
                    this.setState(state => ({
                      inputAmount2: this.calcAmount(
                        state.inputAmount1,
                        state.inputToggle,
                        curr.curr,
                        name,
                      ),
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
