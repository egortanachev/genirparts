import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
// Style
import './../action.css';
import './Category.css';
// Component
import PageTitle from '../../Other/PageTitle';
import LoadingSpinner from './../../Other/LoadingSpinner/LoadingSpinner';
// Image
import deleteCategory from './img/delete.svg';

const DeleteCategory = () => {
    const [deletedCategoryId, setDeletedCategoryId] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/categories');
                setCategories(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/categories/${categoryToDelete._id}`);
            setDeletedCategoryId(categoryToDelete._id);
            setError(null);
            setCategories(categories.filter(category => category._id !== categoryToDelete._id));
            setShowConfirm(false);
        } catch (error) {
            setError(error);
            setDeletedCategoryId(null);
            setShowConfirm(false);
        }
    };

    const confirmDelete = (category) => {
        setCategoryToDelete(category);
        setShowConfirm(true);
    };

    return (
        <section className="section__adminpanel deleteCategory" id='section__adminpanel'>
            <div className='container'>
                <div className="adminpanel__head">
                    <PageTitle
                        titleClass="adminpanel__title"
                        title="Удаление категории"
                    />
                    <Link to='/admin' className='adminpanel__return font-size-22 font-weight-500'>Вернуться обратно</Link>
                </div>
                <div className="category-list">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <table className="category-table">
                            <thead>
                                <tr>
                                    <th className='column1'>Название категории</th>
                                    <th className='column2'>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => (
                                    <tr key={category._id}>
                                        <td className='column1'>{category.category_name}</td>
                                        <td className='column2'>
                                            <button onClick={() => confirmDelete(category)}>
                                                <img src={deleteCategory} alt="delete" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {deletedCategoryId && (
                    <div className="response-message">
                        <p><span>Категория успешно удалена!</span>ID: {deletedCategoryId}</p>
                    </div>
                )}
                {error && (
                    <div className="error-message">
                        <p><span>Ошибка при удалении категории:</span>{error.message}</p>
                    </div>
                )}
                {showConfirm && (
                    <div className="confirm-modal">
                        <p>Вы уверены, что хотите удалить категорию {categoryToDelete.category_name}?</p>
                        <button onClick={handleDelete}>Да</button>
                        <button onClick={() => setShowConfirm(false)}>Нет</button>
                    </div>
                )}
                <div className="adminpanel__bottom">
                    <Link to='/admin' className='font-size-18'>Главная страница</Link>
                    <p className='font-size-18'>Удаление категории</p>
                </div>
            </div>
        </section>
    );
};

export default DeleteCategory;