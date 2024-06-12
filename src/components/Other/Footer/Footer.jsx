import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

import logo from './img/logo.svg';

const Footer = () => {
    return (
        <footer className='footer' id='footer'>
            <div className="container">
                <div className="col col-1">
                    <span>
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                        <p className='font-size-16 footer__adress'>Ленинградская область, деревня Фёдоровское, ул. Шоссейная 2 Г</p>
                    </span>
                    <div className="footer__bottom">
                        <p className='font-size-14'>© Copyright 2024</p>
                        <p className='font-size-14'>Разработка: <a href='https://t.me/egor_tanachev' target='_blank' rel="noopener noreferrer">Таначев Егор</a></p>
                    </div>
                </div>
                <div className="col col-2">
                    <h2 className='font-size-18 font-weight-600'>Меню</h2>
                    <div className="footer__link">
                        <Link className='font-size-16' to="/">Главная</Link>
                        <Link className='font-size-16' to="/catalog">Каталог</Link>
                        <Link className='font-size-16' to="/payment">Оплата</Link>
                        <Link className='font-size-16' to="/delivery">Доставка</Link>
                    </div>
                </div>
                <div className="col col-3">
                    <h2 className='font-size-18 font-weight-600'>Личный кабинет</h2>
                    <div className="footer__link-col">
                        <div className="footer__link">
                            <Link className='font-size-16' to="/">Баланс</Link>
                            <Link className='font-size-16' to="/">Мои заказы</Link>
                            <Link className='font-size-16' to="/">Корзина</Link>
                            <Link className='font-size-16' to="/">Мой транспорт</Link>
                        </div>
                        <div className="footer__link">
                            <Link className='font-size-16' to="/">Мой профиль</Link>
                            <Link className='font-size-16' to="/">Журнал посещений</Link>
                            <Link className='font-size-16' to="/">Контактная информация</Link>
                            <Link className='font-size-16' to="/">Собственные контрагенты</Link>
                        </div>
                    </div>
                </div>
                <div className="col col-4">
                    <span>
                        <h2 className='font-size-18 font-weight-600'>Контакты</h2>
                        <div className="footer__link">
                            <a className='font-size-16' href="tel:+78127168960">8 (812) 716 89 60</a>
                            <a className='font-size-16' href="mailto:sale@genirparts.ru">sale@genirparts.ru</a>
                        </div>
                    </span>
                    <div className="footer__bottom">
                        <Link className='font-size-14' to="/"><span>Пользовательское соглашение</span></Link>
                        <Link className='font-size-14' to="/"><span>Политика конфиденциальности</span></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;