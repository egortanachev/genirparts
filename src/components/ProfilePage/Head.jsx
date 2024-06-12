import React from 'react';
import { Link } from 'react-router-dom'
// Components
import PageTitle from './../Other/PageTitle';
// Style
import './Head.css';

const Head = () => {
    return (
        <div className="profile__head">
            <div className="profile__head-name">
                <PageTitle
                    titleClass="profile__title"
                    title="Личный кабинет"
                />
                <div className="profile__exit font-size-18 font-weight-600">
                    Выйти
                </div>
            </div>
            <div className="profile__head-link">
                <Link to='/' className='font-size-20 font-weight-500'>Контактная информация</Link>
                <Link to='/' className='font-size-20 font-weight-500'>Мои заказы</Link>
                <Link to='/' className='font-size-20 font-weight-500'>Собственные контрагенты</Link>
                <Link to='/' className='font-size-20 font-weight-500'>Баланс</Link>
            </div>
        </div>
    );
};

export default Head;