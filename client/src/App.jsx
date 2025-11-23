import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Cart from "./pages/Cart";
import ScrollToTop from './components/ScrollToTop';
import Products from './pages/Products';
import PaymentInformation from './pages/PaymentInformation';

import OrderSuccessScreen from './components/Checkout/OrderSuccessScreen';
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
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/produkte/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/order/:id" element={<OrderSuccessScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/confirm-registration" element={<AccountConfirmation />} />
              <Route path="/profile" element={<Profile />} />

              {/* Legal Routes */}
              <Route path="/impressum" element={<LegalNotice />} />
              <Route path="/datenschutz" element={<PrivacyPolicy />} />
              <Route path="/agb" element={<TermsOfService />} />
              <Route path="/widerruf" element={<RefundPolicy />} />
              <Route path="/Zahlungsinformationen" element={<PaymentInformation/>}/>
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
