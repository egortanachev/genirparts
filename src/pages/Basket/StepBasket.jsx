import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StepBasket = () => {
    const location = useLocation();

    const getClassName = (step) => {
        return location.pathname === `/basket/${step}` ? 'step active' : 'step';
    };

    return (
        <div className="block_steps">
            <Link to='/basket/1' className={getClassName(1)}>
                <h2 className="step__title font-size-22 font-weight-600">Шаг 1</h2>
                <p className="step__description font-size-16">Проверка заказа</p>
            </Link>
            <Link to='/basket/2' className={getClassName(2)}>
                <h2 className="step__title font-size-22 font-weight-600">Шаг 2</h2>
                <p className="step__description font-size-16">Способ доставки</p>
            </Link>
            <Link to='/basket/3' className={getClassName(3)}>
                <h2 className="step__title font-size-22 font-weight-600">Шаг 3</h2>
                <p className="step__description font-size-16">Оформление заказа</p>
            </Link>
        </div>
    );
};

export default StepBasket;