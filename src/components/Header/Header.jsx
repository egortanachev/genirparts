import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
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
                    
                </div>
            </div>
        </header>
    );
};

export default Header;