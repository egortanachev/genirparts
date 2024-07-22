import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './../axiosConfig';
// Style
import './../action.css';
import './Product.css';
// Component
import PageTitle from './../../Other/PageTitle';
import LoadingSpinner from './../../Other/LoadingSpinner/LoadingSpinner';
// Image
import deleteProduct from './img/delete.svg';

const DeleteProduct = () => {
    const [deletedProductId, setDeletedProductId] = useState(null);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/products');
                setProducts(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            setDeletedProductId(id);
            setError(null);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            setError(error);
            setDeletedProductId(null);
        }
    };

    const formatPrice = (price) => {
        return price.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' ₽';
    };

    return (
        <section className="section__adminpanel deleteProduct" id='section__adminpanel'>
            <div className='container'>
                <div className="adminpanel__head">
                    <PageTitle
                        titleClass="adminpanel__title"
                        title="Удаление товара"
                    />
                    <Link to='/admin' className='adminpanel__return font-size-22 font-weight-500'>Вернуться обратно</Link>
                </div>
                <div className="product-list">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th className='column1'>Артикул</th>
                                    <th className='column2'>Наименование</th>
                                    <th className='column3'>Количество</th>
                                    <th className='column4'>Цена</th>
                                    <th className='column5'>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td className='column1'>{product.article}</td>
                                        <td className='column2'>{product.name}</td>
                                        <td className='column3'>{product.quantity_in_stock}</td>
                                        <td className='column4'>
                                            {formatPrice(product.price)}
                                        </td>
                                        <td className='column5'>
                                            <button onClick={() => handleDelete(product._id)}>
                                                <img src={deleteProduct} alt="delete" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {deletedProductId && (
                    <div className="response-message">
                        <p><span>Товар успешно удален!</span>ID: {deletedProductId}</p>
                    </div>
                )}
                {error && (
                    <div className="error-message">
                        <p><span>Ошибка при удалении товара:</span>{error.message}</p>
                    </div>
                )}
                <div className="adminpanel__bottom">
                    <Link to='/admin' className='font-size-18'>Главная страница</Link>
                    <p className='font-size-18'>Удаление товара</p>
                </div>
            </div>
        </section>
    );
};

export default DeleteProduct;