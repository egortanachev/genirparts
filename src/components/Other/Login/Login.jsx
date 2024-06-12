import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// Components
import PageTitle from './../PageTitle';
// Style
import './Login.css';
// Image
import close from './img/close.svg';

const Login = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, userId } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setEmail('');
        setPassword('');
        onClose();
        navigate('/profile');
      } else {
        setError('Ошибка авторизации');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError('Неправильные данные');
      } else {
        setError('Что-то пошло не так');
      }
    }
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className='popup__login'>
        <div className="popup__close" onClick={onClose}>
          <img src={close} alt="close" />
        </div>
        <PageTitle
            titleClass="login__title"
            title="Вход"
        />
        <p className="font-size-18">Пройдите авторизацию, чтобы воспользоваться более широким функционалом.</p>
        <form onSubmit={handleSubmit} className='login__form'>
            <span>
              <input
                  type="email"
                  value={email}
                  placeholder='Логин'
                  className='font-size-18'
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                  type="password"
                  value={password}
                  placeholder='Пароль'
                  className='font-size-18'
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </span>
          <div className="login__submit">
            <button type="submit" className='font-size-18 font-weight-500'>Войти</button>
            <span>
              <p className='font-size-16'>Нет учетной записи?</p>
              <Link className='font-size-16 font-weight-500' to='/registration' onClick={onClose}>Зарегистрироваться</Link>
            </span>
          </div>
        </form>
        {error && <p className='error-message'><span>{error}</span></p>}
        {success && <p className='response-message'><span>{success}</span></p>}
      </div>
      <div className="popup__bg" onClick={onClose}></div>
    </div>
  );
};

export default Login;