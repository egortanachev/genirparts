import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// Components
import PageTitle from '../../components/Other/PageTitle';
import StepBasket from './StepBasket';
import LoadingSpinner from '../../components/Other/LoadingSpinner/LoadingSpinner';
// Style
import './Basket.css';
// Image
import deleteIcon from './img/delete.svg';

const Basket = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`/api/carts/${userId}`);
                setCartItems(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [userId, navigate]);

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            await axios.delete(`/api/carts/remove/${cartItemId}`);
            setCartItems(cartItems.filter(item => item._id !== cartItemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleRemoveAllFromCart = async () => {
        try {
            await axios.delete(`/api/carts/removeAll/${userId}`);
            setCartItems([]);
        } catch (error) {
            console.error('Error removing all items from cart:', error);
        }
    };

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const response = await axios.put(`/api/carts/update`, { cartItemId, quantity: newQuantity });
            if (response.status === 200) {
                setCartItems(cartItems.map(item =>
                    item._id === cartItemId ? { ...item, quantity: newQuantity } : item
                ));
            } else {
                console.error('Error updating item quantity');
            }
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const increaseQuantity = (cartItemId, currentQuantity) => {
        handleQuantityChange(cartItemId, currentQuantity + 1);
    };

    const decreaseQuantity = (cartItemId, currentQuantity) => {
        if (currentQuantity > 1) {
            handleQuantityChange(cartItemId, currentQuantity - 1);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' ₽';
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p className="error-message">Ошибка: {error.message}</p>;
    }

    return (
        <section className="section__basket">
            <div className="container">
                <div className="basket__page">
                    <PageTitle
                        titleClass="basket__title"
                        title="Корзина"
                    />
                    <StepBasket />
                    {cartItems.length === 0 ? (
                        <p>Ваша корзина пуста.</p>
                    ) : (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='column1 font-size-15 font-weight-600'>Артикул</th>
                                        <th className='column2 font-size-15 font-weight-600'>Наименование</th>
                                        <th className='column3 font-size-15 font-weight-600'>Кол-во</th>
                                        <th className='column4 font-size-15 font-weight-600'>Цена</th>
                                        <th className='column5 font-size-15 font-weight-600'>Стоимость</th>
                                        <th className='column6 font-size-15 font-weight-600'>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item._id}>
                                            <td className='column1 font-size-15 font-weight-500'>
                                                {item.productId.article}
                                            </td>
                                            <td className='column2 font-size-15 font-weight-500'>
                                                {item.productId.name}
                                            </td>
                                            <td className='column3 font-size-15 font-weight-500'>
                                                <div className="quantity-controls">
                                                    <div className="products__actionBasket">
                                                        <span className='products__valueBasket font-size-15 font-weight-500'>{item.quantity}</span>
                                                        <div className="products__valueButton">
                                                            <button className="products__addButton" onClick={() => increaseQuantity(item._id, item.quantity)}></button>
                                                            <button className="products__removeButton" onClick={() => decreaseQuantity(item._id, item.quantity)}></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='column4 font-size-15 font-weight-500'>
                                                {formatPrice(item.productId.price)}
                                            </td>
                                            <td className='column5 font-size-15 font-weight-500'>
                                                {formatPrice(item.productId.price * item.quantity)}
                                            </td>
                                            <td className='column6 font-size-15 font-weight-500'>
                                                <img src={deleteIcon} alt="Удалить" onClick={() => handleRemoveFromCart(item._id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    <div className="basket__bottom">
                        <button className="basket__clear font-size-16 font-weight-500" onClick={handleRemoveAllFromCart}>
                            Очистить корзину
                        </button>
                        <div className="basket__next">
                            <span>
                                <p className="basket__total font-size-15">Общая стоимость:</p>
                                <p className="basket__total font-size-15 font-weight-500">{formatPrice(calculateTotalPrice())}</p>
                            </span>
                            <Link to='/basket/2' className='font-size-18 font-weight-500'>Оформить заказ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Basket;