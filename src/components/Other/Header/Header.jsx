import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

import logo from './img/logo.svg';
import icon1 from './img/icon1.svg';
import icon2 from './img/icon2.svg';
import icon3 from './img/icon3.svg';
import burger from './img/burger.svg';

const Header = ({ onProfileClick }) => {
  return (
    <header className="header" id="header">
      <div className="header__top">
        <div className="container">
          <div className="header__city">
            <p className="font-size-16 font-weight-500">Санкт-Петербург</p>
          </div>
          <div className="header__contact">
            <a className="font-size-16" href="tel:+78127168960">8 (812) 716 89 60</a>
            <a className="font-size-16" href="mailto:sale@genirparts.ru">sale@genirparts.ru</a>
          </div>
          <div className="header__terms">
            <Link to="/payment">Оплата</Link>
            <Link to="/delivery">Доставка</Link>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="container">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="header__products">
            <Link className="header__catalog" to="/catalog">
              <img src={burger} alt="burger" />
              <span className="font-size-16 font-weight-500">Каталог</span>
            </Link>
            <form className="header__find">
              <input type="text" placeholder="Поиск" />
              <input type="submit" value="Найти" title="Начать поиск"/>
            </form>
          </div>
          <div className="header__link">
            <Link to="#" onClick={onProfileClick}>
              <img src={icon1} alt="account" />
              <span className="font-size-12">Профиль</span>
            </Link>
            <Link to="/basket/1">
              <img src={icon2} alt="basket" />
              <span className="font-size-12">Корзина</span>
            </Link>
            <Link to="/info">
              <img src={icon3} alt="info" />
              <span className="font-size-12">Данные</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;