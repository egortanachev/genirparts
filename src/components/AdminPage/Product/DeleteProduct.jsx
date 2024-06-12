import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './../axiosConfig';
// Style
import './../action.css';
import './Product.css';
// Component
import PageTitle from './../../Other/PageTitle';

const DeleteProduct = () => {
    const [deletedProductId, setDeletedProductId] = useState(null);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/products');
                setProducts(res.data);
            } catch (err) {
                setError(err);
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

    return (
        <section className="section__adminpanel" id='section__adminpanel'>
            <div className='container'>
                <div className="adminpanel__head">
                    <PageTitle
                        titleClass="adminpanel__title"
                        title="Удаление товара"
                    />
                    <Link to='/admin' className='adminpanel__return font-size-22 font-weight-500'>Вернуться обратно</Link>
                </div>
                <div className="product-list">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>ID</th>
                                <th>Цена</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product._id}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button onClick={() => handleDelete(product._id)}>Удалить</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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