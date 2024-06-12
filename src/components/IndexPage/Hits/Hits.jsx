import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../../Other/PageTitle';
import './Hits.css';
import LoadingSpinner from '../../Other/LoadingSpinner/LoadingSpinner';
import HitsCard from './HitsCard';

const Hits = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const getRandomProducts = (products, count) => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const topProducts = getRandomProducts(products, 4);

    return (
        <section className="section__hits">
            <div className="container">
                <PageTitle
                    titleClass="hits__title"
                    title="Хиты продаж"
                />
                <div className="hits__grid">
                    {topProducts.map(product => (
                        <HitsCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hits;