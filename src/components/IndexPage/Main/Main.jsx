import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import card1 from './img/card1.png';
import card2 from './img/card2.png';
import card3 from './img/card3.png';
import card4 from './img/card4.png';
import card5 from './img/card5.png';


const Main = () => {
    return (
        <section className='section__main' id='section__main'>
            <div className="container">
                <div className="main__row main__row1">
                    <Link to="/products" className="main__card main__card1 font-size-45 font-weight-700">
                        Пополнение <span>ассортимента</span>
                        <div className="img__bg"></div>
                        <img src={card1} alt="card1" />
                    </Link>
                    <Link to="/manufacturers" className="main__card main__card2 font-size-35 font-weight-600">
                        Производители <span>запчастей</span>
                        <div className="img__bg"></div>
                        <img src={card2} alt="card2" />
                    </Link>
                </div>
                <div className="main__row main__row2">
                    <Link to="/catalog" className="main__card main__card3 font-size-28 font-weight-500">
                        <span>Запчасти для грузовиков</span>
                        <div className="img__bg"></div>
                        <img src={card3} alt="card3" />
                    </Link>
                    <ScrollLink to="section__about" smooth={true} duration={500} offset={-120} className="main__card main__card4 font-size-28 font-weight-500">
                        <span>О нашей компании</span>                        
                        <div className="img__bg"></div>
                        <img src={card4} alt="card4" />
                    </ScrollLink>
                    <ScrollLink to="section__form" smooth={true} duration={500} offset={-120} className="main__card main__card5 font-size-28 font-weight-500">
                        <span>Связаться с нами</span>
                        <div className="img__bg"></div>
                        <img src={card5} alt="card5" />
                    </ScrollLink>
                </div>
            </div>
        </section>
    );
};

export default Main;