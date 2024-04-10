import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer';

// Pages
import Main from './pages/Main';
import Payment from './pages/Payment';
import Delivery from './pages/Delivery';

function App() {
  return (
    <div className="App">
        <Router>
          <div className='header__height'></div>
          <Header />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/delivery" element={<Delivery />} />
          </Routes>

          <Footer />
        </Router>
    </div>
  );
}

export default App;
