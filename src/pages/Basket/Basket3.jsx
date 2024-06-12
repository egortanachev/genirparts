import React from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// Components
import PageTitle from '../../components/Other/PageTitle';
import StepBasket from './StepBasket';
// Style
import './Basket.css';

const Basket = () => {

    return (
        <section className="section__basket">
            <div className="container">
                <div className="basket__page">
                    <PageTitle
                        titleClass="basket__title"
                        title="Корзина"
                    />
                    <StepBasket />
                </div>
            </div>
        </section>
    );
};

export default Basket;