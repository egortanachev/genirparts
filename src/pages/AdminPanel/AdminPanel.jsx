import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './AdminPanel.css';
import PageTitle from './../../components/Other/PageTitle';

import logo from './img/logo.svg';

const AdminPanel = () => {
    return (
        <section className="section__adminpanel" id='section__adminpanel'>
            <Helmet>
                <title>Административная панель | GenirParts</title>
            </Helmet>
            <div className='container'>
                <div className="adminpanel__head">
                    <PageTitle
                        titleClass="adminpanel__title"
                        title="Административная панель"
                    />
                    <a href='/' target='_blank' rel="noopener noreferrer">
                        <img src={logo} alt="logo" />
                    </a>                    
                </div>
                <div className="adminpanel__body">
                    <div>
                        <h3 className='font-size-24 font-weight-600'>Товары</h3>
                        <span>
                            <Link to='/admin/addProduct' className='font-size-20 font-weight-500'>Добавление<br />товара</Link>
                            <Link to='' className='font-size-20 font-weight-500'>Редактирование<br />товара</Link>
                            <Link to='/admin/deleteProduct' className='font-size-20 font-weight-500'>Удаление<br />товара</Link>
                        </span>
                    </div>
                    <div>
                        <h3 className='font-size-24 font-weight-600'>Категории</h3>
                        <span>
                            <Link to='/admin/addCategory' className='font-size-20 font-weight-500'>Добавление<br />категории</Link>
                            <Link to='' className='font-size-20 font-weight-500'>Редактирование<br />категории</Link>
                            <Link to='/admin/deleteCategory' className='font-size-20 font-weight-500'>Удаление<br />категории</Link>
                        </span>
                    </div>
                    <div>
                        <h3 className='font-size-24 font-weight-600'>Производители</h3>
                        <span>
                            <Link to='/admin/addManufacturer' className='font-size-20 font-weight-500'>Добавление<br />производителя</Link>
                            <Link to='' className='font-size-20 font-weight-500'>Редактирование<br />производителя</Link>
                            <Link to='' className='font-size-20 font-weight-500'>Удаление<br />производителя</Link>
                        </span>
                    </div>
                    <div>
                        <h3 className='font-size-24 font-weight-600'>Заказы</h3>
                        <span>
                            <Link to='' className='font-size-20 font-weight-500'>Просмотр<br />заказов</Link>
                            <Link to='' className='font-size-20 font-weight-500'>Обновление<br />статуса</Link>
                        </span>
                    </div>
                </div>
                <div className="adminpanel__bottom">
                    <a href='/' target='_blank' rel="noopener noreferrer" className='font-size-18'>Главная страница</a>
                    <p className='font-size-18'>Административная панель</p>
                </div>
            </div>
        </section>
    );
};

export default AdminPanel;