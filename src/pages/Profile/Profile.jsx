import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Components
import Head from './../../components/ProfilePage/Head';
import LoadingSpinner from '../../components/Other/LoadingSpinner/LoadingSpinner';
// Images
import open__green from './img/open__green.svg';
import open__white from './img/open__white.svg';
import track from './img/track.png';
import calc from './img/calc.png';
// Styles
import './Profile.css'

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className="section__profile" id='section__profile'>
            <div className="container">
                <Head />
                <div className="profile__cards">
                    <div className="profile__card profile__card1">
                        <div className="profile__card-head">
                            <h3 className='font-size-20 font-weight-500'>Контактная информация</h3>
                            <Link to=''>
                                <img src={open__green} alt="open" />
                            </Link>
                        </div>
                        <div className="profile__card-body">
                            <div className="profile__user">
                                <span className='font-size-18'>Имя:</span>
                                <span className='font-size-18'>{userData.profile?.firstName}</span>
                            </div>
                            <div className="profile__user">
                                <span className='font-size-18'>Фамилия:</span>
                                <span className='font-size-18'>{userData.profile?.lastName}</span>
                            </div>
                            <div className="profile__user">
                                <span className='font-size-18'>E-mail:</span>
                                <span className='font-size-18'>{userData.user?.email}</span>
                            </div>
                            <div className="profile__user">
                                <span className='font-size-18'>Логин:</span>
                                <span className='font-size-18'>{userData.user?.login}</span>
                            </div>
                            <div className="profile__user">
                                <span className='font-size-18'>Телефон:</span>
                                <span className='font-size-18'>{userData.user?.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile__card profile__card2">
                        <div className="profile__card-head">
                            <h3 className='font-size-20 font-weight-500'>Мои заказы</h3>
                            <Link to=''>
                                <img src={open__green} alt="open" />
                            </Link>
                        </div>
                        <div className="profile__card-body">
                            <p className='font-size-16'>В этом разделе Вы можете просматривать приобретенные товары. Здесь хранится вся информация о ваших заказах.</p>
                        </div>
                    </div>
                    <div className="profile__card profile__card3">
                        <h3 className='font-size-28 font-weight-500'>Контрагенты</h3>
                        <Link to=''>
                            <img src={open__white} alt="open" />
                        </Link>
                        <p className='font-size-18'>В этом разделе вы можете добавлять пользователей для оформления заказа</p>
                        <div className="profile__banner-imgbg"></div>
                        <img src={track} alt="track" className='profile__banner-img' />
                    </div>
                    <div className="profile__card profile__card4">
                        <h3 className='font-size-28 font-weight-500'>Баланс</h3>
                        <Link to=''>
                            <img src={open__white} alt="open" />
                        </Link>
                        <p className='font-size-18'>В этом разделе вы можете заказывать сверки расчетов с бухгалтерией</p>
                        <div className="profile__banner-imgbg"></div>
                        <img src={calc} alt="calc" className='profile__banner-img' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;