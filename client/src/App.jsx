import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import CookieSettings from "./pages/CookieSettings"
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Cart from "./pages/Cart";
import OrderSuccessScreen from './pages/OrderSuccessScreen';
import Products from './pages/Products';

import ScrollToTop from './components/ScrollToTop';
import AccountConfirmation from './components/AccountConfirmation';
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsentBanner from './components/CookieConsentBanner';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <CartProvider>
      <AuthProvider>
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
              <Route path="/produkte" element={<Products />} />
              <Route path="/produkte/:id" element={<ProductDetail />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/warenkorb" element={<Cart />} />
              <Route path="/bestellungen/:id" element={<OrderSuccessScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/confirm-registration" element={<AccountConfirmation />} />
              <Route path="/profil" element={<Profile />} />

              {/* Legal Routes */}
              <Route path="/impressum" element={<LegalNotice />} />
              <Route path="/datenschutz" element={<PrivacyPolicy />} />
              <Route path="/agb" element={<TermsOfService />} />
              <Route path="/widerruf" element={<RefundPolicy />} />
              <Route path="/cookies" element={<CookieSettings />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
