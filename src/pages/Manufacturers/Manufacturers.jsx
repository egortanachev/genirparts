import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Style
import './Manufacturers.css';
// Components
import PageTitle from './../../components/Other/PageTitle';
import LoadingSpinner from '../../components/Other/LoadingSpinner/LoadingSpinner';

const Manufacturers = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const response = await axios.get('/api/manufacturers');
                setManufacturers(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchManufacturers();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <section className="section__manufacturers">
            <div className="container">
                <PageTitle
                    titleClass="manufacturers__title"
                    title="Производители"
                />
                <div className="manufacturers__grid">
                    {manufacturers.map(manufacturer => (
                        <div key={manufacturer._id} className="manufacturer__card">
                            <div className="manufacturer__card-top">
                                <div className="manufacturer__card-head">
                                    <p className='font-size-18'>Производитель</p>
                                    <h2 className='font-size-22 font-weight-600'>{manufacturer.manufacturer_name}</h2>
                                </div>
                                {manufacturer.image && (
                                    <img 
                                        src={manufacturer.image}
                                        alt={manufacturer.manufacturer_name} 
                                        className="manufacturer__logo" 
                                    />
                                )}
                            </div>
                            <div className="manufacturer__card-body">
                                <p className='font-size-18'>{manufacturer.description}</p>
                                <Link className='font-size-18 font-weight-500' to={`/products?manufacturer_id=${manufacturer._id}`}>Смотреть</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Manufacturers;
