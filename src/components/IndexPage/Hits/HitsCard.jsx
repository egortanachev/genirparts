import React from 'react';
import logo from './img/logo.jpg';

const HitsCard = ({ product }) => {
    const formatPrice = (price) => {
        return price.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' ₽';
    };

    return (
        <div className="hits__card">
            <img src={product.image ? product.image : logo} alt={product.name} className="hits__info-image" />
            <div className="hits__info">
                <p className="hits__info-article font-size-18">{product.article}</p>
                <p className="hits__info-name font-size-18 font-weight-500">{product.name}</p>
                <div className="hits__info-bottom">
                    <p className="hits__info-price font-size-20">{formatPrice(product.price)}</p>
                    <button className="hits__info-button font-size-18 font-weight-500">В корзину</button>
                </div>
            </div>
        </div>
    );
};

export default HitsCard;