import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Kontakt from './pages/Kontakt';
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsentBanner from './components/CookieConsentBanner';

import ProductDetail from './pages/productDetails/ProductDetail';
import Cart from "./pages/Cart";
import ScrollToTop from './components/ScrollToTop';
import Products from './pages/Products';
import { CartProvider } from './context/CartContext';
import CheckoutScreen from './pages/Checkout';
import OrderSuccessScreen from './pages/OrderSuccessScreen';

import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';


function App() {
  return (
    <CartProvider> 
      {/* 2. Cookie Banner */}
      <CookieConsentBanner />
      
      <Router>
        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Header */}
        <Header />

        {/* Main Content*/}
        <main style={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/order/:id" element={<OrderSuccessScreen />} />

            {/* Legal Routes */}
            <Route path="/impressum" element={<LegalNotice />} />
            <Route path="/datenschutz" element={<PrivacyPolicy />} />
            <Route path="/agb" element={<TermsOfService />} />
            <Route path="/widerruf" element={<RefundPolicy />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
