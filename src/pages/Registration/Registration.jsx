import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Components
import PageTitle from '../../components/Other/PageTitle';
// Style
import './Registration.css';

import img from './img/img.png';

const Registration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (!agreement) {
            setError('Вы должны согласиться с пользовательским соглашением');
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', {
                email,
                password,
                phone,
                firstName,
                lastName
            });

            if (response.status === 201) {
                const { token, userId } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);

                setSuccess('Регистрация успешно совершена!');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setFirstName('');
                setLastName('');
                setPhone('');
                setAgreement(false);
                navigate('/profile');
            } else {
                setError('Ошибка регистрации');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Ошибка регистрации');
            } else {
                setError('Что-то пошло не так');
            }
        }
    };

    return (
        <section className='section__registartion' id='section__registartion'>
            <div className='container'>
                <PageTitle
                    titleClass="registartion__title"
                    title="Регистрация"
                />
                <div className="registartion__content">
                    <div className="registartion__left">
                        <form onSubmit={handleSubmit} className='registartion__form'>
                            <div>
                                <p className='font-size-18'>Имя <span>*</span></p>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <p className='font-size-18'>Фамилия <span>*</span></p>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <p className='font-size-18'>Email <span>*</span></p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <p className='font-size-18'>Пароль <span>*</span></p>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <p className='font-size-18'>Подтвердите пароль <span>*</span></p>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <p className='font-size-18'>Телефон <span>*</span></p>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="registartion__agreement">
                                <input
                                    type="checkbox"
                                    checked={agreement}
                                    onChange={(e) => setAgreement(e.target.checked)}
                                    id='checkbox__agreement'
                                />
                                <label className='font-size-16' htmlFor='checkbox__agreement'>Я принимаю <Link to='/wef'>пользовательское соглашение</Link> и подтверждаю, что согласен с <Link to='/wjf'>политикой конфиденциальности</Link> данного сайта <span className='font-weight-700'>*</span></label>
                            </div>
                            <button type="submit" className='font-size-18 font-weight-500'>Зарегистрироваться</button>
                        </form>

                        {error && <div className="error-message"><span>{error}</span></div>}
                        {success && <div className='response-message'><span>{success}</span></div>}
                    </div>
                    <div className="registartion__right">
                        <div className="registartion__banner">
                            <h2 className='font-size-28 font-weight-500'>После регистрации будет доступен полный функционал</h2>
                            <div className="registartion__banner-imgbg"></div>
                            <img src={img} alt="track" />
                        </div>
                        <p className='font-size-16'><span className='font-weight-700'>*</span> Поля, обязательные для заполнения</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;