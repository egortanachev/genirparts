import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Index from './pages/Index';
import Catalog from './pages/Catalog/Catalog';
import Manufacturers from './pages/Manufacturers/Manufacturers';
import Products from './pages/Products/Products';
import Registration from './pages/Registration/Registration';
import Profile from './pages/Profile/Profile';
import Basket1 from './pages/Basket/Basket1';
import Basket2 from './pages/Basket/Basket2';
import Basket3 from './pages/Basket/Basket3';
import Delivery from './pages/Delivery/Delivery';
import Payment from './pages/Payment/Payment';

import AdminPanel from './pages/AdminPanel/AdminPanel';
import AddProduct from './components/AdminPage/Product/AddProduct';
import AddCategory from './components/AdminPage/Category/AddCategory';
import AddManufacturer from './components/AdminPage/Manufacturer/AddManufacturer';

import DeleteProduct from './components/AdminPage/Product/DeleteProduct';
import DeleteCategory from './components/AdminPage/Category/DeleteCategory';

const AppRoutes = ({ isAdminRoute }) => {
  return (
    <Routes>
      {/* client */}
      <Route path="/" element={<Index />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/products" element={<Products />} />
      <Route path="/manufacturers" element={<Manufacturers />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/basket/1" element={<Basket1 />} />
      <Route path="/basket/2" element={<Basket2 />} />
      <Route path="/basket/3" element={<Basket3 />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/payment" element={<Payment />} />
      {/* admin */}
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/addProduct" element={<AddProduct />} />
      <Route path="/admin/addCategory" element={<AddCategory />} />
      <Route path="/admin/addManufacturer" element={<AddManufacturer />} />

      <Route path="/admin/deleteProduct" element={<DeleteProduct />} />
      <Route path="/admin/deleteCategory" element={<DeleteCategory />} />
    </Routes>
  );
};

export default AppRoutes;