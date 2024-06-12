import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Style
import './Catalog.css'
// Components
import PageTitle from './../../components/Other/PageTitle';
import LoadingSpinner from '../../components/Other/LoadingSpinner/LoadingSpinner';

import logo from './img/logo.jpg';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <section className="section__catalog" id='section__catalog'>
            <div className="container">
                <PageTitle
                    titleClass="catalog__title"
                    title="Каталог"
                />
                <ul>
                    {categories.map(category => (
                        <li key={category._id}>
                            <Link to={`/products?category_id=${category._id}`}>
                                <img src={category.image ? category.image : logo} alt="logo" />
                                <p className='font-size-18 font-weight-500'>{category.category_name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default CategoryList;