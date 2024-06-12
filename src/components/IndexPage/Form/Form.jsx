import React from 'react';
import PageTitle from '../../Other/PageTitle';
import './Form.css';

import img from './img/img.png';


const Form = () => {
    return (
        <section className="section__form" id="section__form">
            <div className="container">
                <div className="form__left">
                    <PageTitle
                        titleClass="form__title"
                        title="Оставить заявку"
                    />
                    <form action="">
                        <input className='font-size-18' type="text" placeholder='Ваше имя' />
                        <input className='font-size-18' type="text" placeholder='Номер телефона' />
                        <input className='font-size-18' type="text" placeholder='Марка грузовика' />
                        <input className='font-size-18' type="text" placeholder='Деталь' />
                        <input className='font-size-18 font-weight-500' type="submit" value='Отправить' />
                    </form>
                </div>
                <div className="form__right">
                    <p className='font-size-28 font-weight-500'>Персональный подход</p>
                    <p className='font-size-20 form__banner-description'>Менеджер свяжется с вами и поможет составить заказ индивидуально под вас</p>
                    <div className="form__banner-imgbg"></div>
                    <img src={img} alt="track" />
                </div>
            </div>
        </section>
    );
};

export default Form;