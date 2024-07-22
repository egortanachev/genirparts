import React from 'react';
import PropTypes from 'prop-types';
// import './ProductList.css';

import photoGreen from './img/photo-green.svg';
import photoGray from './img/photo-gray.svg';
import changeGray from './img/change-gray.svg';

const ProductList = ({ products, quantities, cart, onAddToCart, onRemoveFromCart, onQuantityChange, onMouseOver, onMouseOut, modalPhoto, activeProduct, formatPrice }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th className='column1 font-size-15 font-weight-600'>Артикул</th>
                    <th className='column2 font-size-15 font-weight-600'>Наименование</th>
                    <th className='column3 font-size-15 font-weight-600'>Кол-во</th>
                    <th className='column4 font-size-15 font-weight-600'>Цена</th>
                    <th className='column5 font-size-15 font-weight-600'>Замена</th>
                    <th className='column6 font-size-15 font-weight-600'>Фото</th>
                    <th className='column7 font-size-15 font-weight-600'>Выполнить заказ</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => {
                    let quantityClass = '';
                    let displayQuantity = product.quantity_in_stock;

                    if (product.quantity_in_stock === 0) {
                        quantityClass = 'out-of-stock';
                        displayQuantity = 'заказ';
                    } else if (product.quantity_in_stock > 20) {
                        quantityClass = 'in-stock';
                        displayQuantity = '>20';
                    }

                    const cartItem = cart.find(item => item.productId === product._id);

                    return (
                        <tr key={product._id}>
                            <td className='column1 font-size-15 font-weight-500'>
                                <p>{product.article}</p>
                                <p>{product.manufacturer_id.manufacturer_name}</p>
                            </td>
                            <td className='column2 font-size-15 font-weight-500'>{product.name}</td>
                            <td className={`column3 font-size-15 font-weight-500 ${quantityClass}`}>
                                {displayQuantity}
                            </td>
                            <td className='column4 font-size-15 font-weight-500'>{formatPrice(product.price)}</td>
                            <td className='column5 font-size-15 font-weight-500'>
                                <img src={changeGray} alt='Замена'/>
                            </td>
                            <td className='column6 font-size-15 font-weight-500'>
                                <div className="photo-container" 
                                     onMouseOver={() => onMouseOver(product._id)}
                                     onMouseOut={onMouseOut}>
                                    <img
                                        src={product.image ? photoGreen : photoGray} 
                                        alt='Фото' 
                                    />
                                    {modalPhoto && activeProduct === product._id && (
                                        <div className="modal">
                                            <img src={modalPhoto} alt="Product" />
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className='column7 font-size-15 font-weight-500'>
                                <div className="quantity-controls">
                                    <button 
                                        className={`products__addBasket font-size-13 font-weight-500 ${cartItem ? 'remove' : ''}`} 
                                        onClick={() => cartItem ? onRemoveFromCart(cartItem.cartItemId) : onAddToCart(product)}
                                    >
                                        {cartItem ? 'Убрать' : 'В корзину'}
                                    </button>
                                    <div className="products__actionBasket">
                                        <span className='font-size-15 font-weight-500 products__valueBasket'>{quantities[product._id]}</span>
                                        <div className="products__valueButton">
                                            <button className='products__addButton' onClick={() => onQuantityChange(product._id, 1)}></button>
                                            <button className='products__removeButton' onClick={() => onQuantityChange(product._id, -1)}></button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    quantities: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
    modalPhoto: PropTypes.string,
    activeProduct: PropTypes.string,
    formatPrice: PropTypes.func.isRequired
};

export default ProductList;