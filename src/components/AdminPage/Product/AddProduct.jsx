import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './../axiosConfig';
import './../action.css';
import PageTitle from './../../Other/PageTitle';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        article: '',
        price: '',
        quantity_in_stock: '',
        category_id: '',
        manufacturer_id: '',
        description: '',
        image: null
    });

    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/categories');
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchManufacturers = async () => {
            try {
                const res = await axios.get('/api/manufacturers');
                setManufacturers(res.data);
            } catch (error) {
                console.error('Error fetching manufacturers:', error);
            }
        };

        fetchCategories();
        fetchManufacturers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'category_id' || name === 'manufacturer_id') {
            const selectElement = e.target;
            if (value) {
                selectElement.classList.add('selected');
            } else {
                selectElement.classList.remove('selected');
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct(prevState => ({
            ...prevState,
            image: file
        }));
        setFileName(file ? file.name : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in product) {
            formData.append(key, product[key]);
        }

        try {
            const res = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResponse(res.data);
            setError(null);

            setProduct({
                name: '',
                article: '',
                price: '',
                quantity_in_stock: '',
                category_id: '',
                manufacturer_id: '',
                description: '',
                image: null
            });
            setFileName('');
        } catch (error) {
            setError(error);
            setResponse(null);
        }
    };

    return (
        <section className="section__adminpanel" id='section__adminpanel'>
            <div className='container'>
                <div className="adminpanel__head">
                    <PageTitle
                        titleClass="adminpanel__title"
                        title="Добавление товара"
                    />
                     <Link to='/admin' className='adminpanel__return font-size-22 font-weight-500'>Вернуться обратно</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text" 
                            name="name" 
                            placeholder="Наименование" 
                            value={product.name} 
                            onChange={handleChange}
                            className='font-size-18'
                        />
                        <input 
                            type="text" 
                            name="article" 
                            placeholder="Артикул" 
                            value={product.article} 
                            onChange={handleChange}
                            className='font-size-18'
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="price" 
                            placeholder="Цена" 
                            value={product.price} 
                            onChange={handleChange}
                            className='font-size-18'
                        />
                        <input 
                            type="text" 
                            name="quantity_in_stock" 
                            placeholder="Количество" 
                            value={product.quantity_in_stock} 
                            onChange={handleChange}
                            className='font-size-18'
                        />
                    </div>
                    <div className="form-group">
                        <select 
                            name="category_id" 
                            value={product.category_id} 
                            onChange={handleChange}
                            className={`font-size-18 ${product.category_id ? 'selected' : ''}`}
                        >
                            <option value="" disabled>Категория</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.category_name}</option>
                            ))}
                        </select>
                        <select 
                            name="manufacturer_id" 
                            value={product.manufacturer_id} 
                            onChange={handleChange}
                            className={`font-size-18 ${product.manufacturer_id ? 'selected' : ''}`}
                        >
                            <option value="" disabled>Производитель</option>
                            {manufacturers.map(manufacturer => (
                                <option key={manufacturer._id} value={manufacturer._id}>{manufacturer.manufacturer_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea 
                            name="description" 
                            placeholder="Описание" 
                            value={product.description} 
                            onChange={handleChange}
                            className='font-size-18'
                        />
                        <label className="upload-button font-size-18">
                            Загрузить фотографию
                            <input 
                                type="file" 
                                name="image" 
                                onChange={handleImageChange} 
                                style={{ display: 'none' }} 
                            />
                        </label>
                        {fileName && (
                            <div className="file-name font-size-18">
                                {fileName}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="submit-button font-size-18 font-weight-500">Создать</button>
                </form>
                {response && (
                    <div className="response-message">
                        <p><span>Товар успешно добавлен!</span>ID: {response._id}</p>
                    </div>
                )}
                {error && (
                    <div className="error-message">
                        <p><span>Ошибка при добавлении товара:</span>{error.message}</p>
                    </div>
                )}
                <div className="adminpanel__bottom">
                    <Link to='/admin' className='font-size-18'>Главная страница</Link>
                    <p className='font-size-18'>Добавление товара</p>
                </div>
            </div>
        </section>
    );
};

export default AddProduct;