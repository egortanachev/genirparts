import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Products.css';
import LoadingSpinner from './../../components/Other/LoadingSpinner/LoadingSpinner';
import PageTitle from './../../components/Other/PageTitle';
import Breadcrumbs from './../../components/ProductPage/Breadcrumbs/Breadcrumbs';
import Pagination from './../../components/ProductPage/Pagination/Pagination';
import ProductList from './../../components/ProductPage/ProductList/ProductList';
import FilterBar from './../../components/ProductPage/FilterBar/FilterBar';

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
    const [itemsPerPage] = useState(10);
    const [cart, setCart] = useState([]);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const location = useLocation();

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
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
                const manufacturersResponse = await axios.get(`/api/manufacturers`);
                setFilterOptions(manufacturersResponse.data);
            } else if (manufacturerId) {
                url = `/api/products/manufacturer/${manufacturerId}`;
                const manufacturerResponse = await axios.get(`/api/manufacturers/${manufacturerId}`);
                setPageTitle(manufacturerResponse.data.manufacturer_name);
                setBreadcrumbs([
                    { path: '/', label: 'Главная' },
                    { path: '/manufacturers', label: 'Производители' },
                    { path: `/manufacturers/${manufacturerId}`, label: manufacturerResponse.data.manufacturer_name }
                ]);
                const categoriesResponse = await axios.get(`/api/categories`);
                setFilterOptions(categoriesResponse.data);
            } else {
                setPageTitle('Последние поступления');
                setBreadcrumbs([
                    { path: '/', label: 'Главная' },
                    { path: '/latest', label: 'Последние поступления' }
                ]);
            }

            const response = await axios.get(url);
            let filteredProducts = response.data;
            if (selectedFilter) {
                filteredProducts = filteredProducts.filter(product => 
                    product.category_id === selectedFilter || product.manufacturer_id === selectedFilter);
            }

            let sortedProducts = filteredProducts;
            if (sortField) {
                sortedProducts = sortedProducts.sort((a, b) => {
                    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
                    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            setProducts(sortedProducts);
            setProductCount(filteredProducts.length); // Изменено здесь
            setQuantities(response.data.reduce((acc, product) => {
                acc[product._id] = 1;
                return acc;
            }, {}));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [location.search, sortField, sortOrder, selectedFilter]);

    useEffect(() => {
        fetchProducts();
    }, [location.search, fetchProducts]);

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
                const cartItem = response.data;
                console.log(`Product ${product._id} added to cart with quantity ${quantity}`);
                setCart([...cart, { productId: product._id, cartItemId: cartItem._id }]);
            } else {
                console.error('Error adding product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            const response = await axios.delete(`/api/carts/remove/${cartItemId}`);

            if (response.status === 200) {
                console.log(`Cart item ${cartItemId} removed from cart`);
                setCart(cart.filter(item => item.cartItemId !== cartItemId));
            } else {
                console.error('Error removing product from cart');
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
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

    const handleSortChange = (event) => {
        const value = event.target.value;
        if (value === 'default') {
            setSortField('createdAt');
            setSortOrder('desc');
        } else {
            const [field, order] = value.split('_');
            setSortField(field);
            setSortOrder(order);
        }
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
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
                    <FilterBar 
                        filterOptions={filterOptions}
                        selectedFilter={selectedFilter}
                        handleFilterChange={handleFilterChange}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        handleSortChange={handleSortChange}
                        location={location}
                    />
                    <p className="products__filter-count font-size-22 font-weight-500">{productCount} товаров</p>
                </div>
                <ProductList
                    products={currentProducts}
                    quantities={quantities}
                    cart={cart}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
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