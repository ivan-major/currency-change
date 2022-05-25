import React from 'react';
import './Header.css'

export const Header = ({ currencies }) => (
  <>
    <h1 className="header__title">Курс валют в Україні</h1>

    <ul className="header__items">
      <li className="header__item header__item--title">
        <div>Курс до гривні</div>
        <div>Купівля</div>
        <div>Продаж</div>
      </li>

      {currencies.map((currency) => {
        if (currency.ccy !== 'BTC') {
          return (
            <li key={currency.ccy} className="header__item headr__item--text">
              <div>{currency.ccy}</div>
              <div>{+currency.buy}</div>
              <div>{+currency.sale}</div>
            </li>
          )
        }

        return null;
      })}
    </ul>
  </>
);
