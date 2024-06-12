import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// Style
import './Products.css';
// Components
import LoadingSpinner from './../../components/Other/LoadingSpinner/LoadingSpinner';
import PageTitle from './../../components/Other/PageTitle';
import Breadcrumbs from './../../components/ProductPage/Breadcrumbs/Breadcrumbs';
import Pagination from './../../components/ProductPage/Pagination/Pagination';
import ProductList from './../../components/ProductPage/ProductList/ProductList';
// Image
import settings from './img/settings.svg';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalPhoto, setModalPhoto] = useState(null);
    const [activeProduct, setActiveProduct] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [pageTitle, setPageTitle] = useState('Последние поступления');
    const [productCount, setProductCount] = useState(0);
    const [breadcrumbs, setBreadcrumbs] = useState([{ path: '/', label: 'Главная' }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Количество товаров на странице
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const categoryId = queryParams.get('category_id');
                const manufacturerId = queryParams.get('manufacturer_id');
                let url = '/api/products';

                if (categoryId) {
                    url = `/api/products/category/${categoryId}`;
                    const categoryResponse = await axios.get(`/api/categories/${categoryId}`);
                    setPageTitle(categoryResponse.data.category_name);
                    setBreadcrumbs([
                        { path: '/', label: 'Главная' },
                        { path: '/catalog', label: 'Каталог' },
                        { path: `/catalog?category_id=${categoryId}`, label: categoryResponse.data.category_name }
                    ]);
                } else if (manufacturerId) {
                    url = `/api/products/manufacturer/${manufacturerId}`;
                    const manufacturerResponse = await axios.get(`/api/manufacturers/${manufacturerId}`);
                    setPageTitle(manufacturerResponse.data.manufacturer_name);
                    setBreadcrumbs([
                        { path: '/', label: 'Главная' },
                        { path: '/manufacturers', label: 'Производители' },
                        { path: `/manufacturers/${manufacturerId}`, label: manufacturerResponse.data.manufacturer_name }
                    ]);
                } else {
                    setPageTitle('Последние поступления');
                    setBreadcrumbs([
                        { path: '/', label: 'Главная' },
                        { path: '/latest', label: 'Последние поступления' }
                    ]);
                }

                const response = await axios.get(url);
                setProducts(response.data);
                setProductCount(response.data.length);
                setQuantities(response.data.reduce((acc, product) => {
                    acc[product._id] = 1;
                    return acc;
                }, {}));
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [location.search, currentPage, itemsPerPage]);

    const formatPrice = (price) => {
        return price.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' ₽';
    };

    const handleMouseOver = async (productId) => {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            setModalPhoto(response.data.image);
            setActiveProduct(productId);
        } catch (err) {
            console.error('Error fetching product image', err);
        }
    };

    const handleMouseOut = () => {
        setModalPhoto(null);
        setActiveProduct(null);
    };

    const handleAddToCart = async (product) => {
        const quantity = quantities[product._id];
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        try {
            const response = await axios.post('/api/carts/add', {
                userId,
                productId: product._id,
                quantity,
            });

            if (response.status === 201) {
                console.log(`Product ${product._id} added to cart with quantity ${quantity}`);
            } else {
                console.error('Error adding product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleQuantityChange = (productId, change) => {
        setQuantities(prevQuantities => {
            const newQuantity = Math.max(1, (prevQuantities[productId] || 1) + change);
            return { ...prevQuantities, [productId]: newQuantity };
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p className="error-message">Ошибка: {error.message}</p>;
    }

    return (
        <section className="section__products">
            <div className="container">
                <Breadcrumbs items={breadcrumbs} />
                <PageTitle
                    titleClass="products__title"
                    title={pageTitle}
                />
                <div className="products__filter">
                    <img src={settings} alt="settings" />
                    <p className="products__filter-count font-size-22 font-weight-500">{productCount} товаров</p>
                </div>
                <ProductList
                    products={currentProducts}
                    quantities={quantities}
                    onAddToCart={handleAddToCart}
                    onQuantityChange={handleQuantityChange}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    modalPhoto={modalPhoto}
                    activeProduct={activeProduct}
                    formatPrice={formatPrice}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
};

export default Products;