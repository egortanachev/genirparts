import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
import './action.css';
import PageTitle from '../../../components/Other/PageTitle';

const AddManufacturer = () => {
    const [manufacturer, setManufacturer] = useState({
        manufacturer_name: '',
        description: '',
        image: null
    });

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setManufacturer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setManufacturer(prevState => ({
            ...prevState,
            image: file
        }));
        setFileName(file ? file.name : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in manufacturer) {
            formData.append(key, manufacturer[key]);
        }

        try {
            const res = await axios.post('/api/manufacturers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResponse(res.data);
            setError(null);

            // Очистка полей после успешной отправки
            setManufacturer({
                manufacturer_name: '',
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
                        title="Добавить производителя"
                    />
                    <Link to='/admin' className='adminpanel__return font-size-22 font-weight-500'>Вернуться обратно</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text" 
                            name="manufacturer_name" 
                            placeholder="Наименование производителя" 
                            value={manufacturer.manufacturer_name} 
                            onChange={handleChange}
                            className='font-size-18'
                        />
                    </div>
                    <div className="form-group">
                        <textarea 
                            name="description" 
                            placeholder="Описание" 
                            value={manufacturer.description} 
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
                        <p><span>Производитель успешно добавлен!</span>ID: {response._id}</p>
                    </div>
                )}
                {error && (
                    <div className="error-message">
                        <p><span>Ошибка при добавлении производителя:</span>{error.message}</p>
                    </div>
                )}
                <div className="adminpanel__bottom">
                    <Link to='/admin' className='font-size-18'>Главная страница</Link>
                    <p className='font-size-18'>Добавление производителя</p>
                </div>
            </div>
        </section>
    );
};

export default AddManufacturer;