import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

// Components
import ScrollToTop from './components/Other/ScrollToTop';
import Login from './components/Other/Login/Login';
import Header from './components/Other/Header/Header';
import Footer from './components/Other/Footer/Footer';
import AppRoutes from './AppRoutes';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProfileClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Router>
      <AppContent 
        isPopupOpen={isPopupOpen} 
        handleProfileClick={handleProfileClick} 
        handleClosePopup={handleClosePopup} 
      />
    </Router>
  );
}

function AppContent({ isPopupOpen, handleProfileClick, handleClosePopup }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <ScrollToTop />
      <Login isOpen={isPopupOpen} onClose={handleClosePopup} />
      {!isAdminRoute && <Header onProfileClick={handleProfileClick} />}
      <AppRoutes isAdminRoute={isAdminRoute} />
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;