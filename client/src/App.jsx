import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail.tsx';
import Cart from "./pages/Cart";
import OrderSuccessScreen from './pages/OrderSuccessScreen';
import Products from './pages/Products';

import LegalNotice from './pages/legal/LegalNotice.tsx';
import PrivacyPolicy from './pages/legal/PrivacyPolicy.tsx';
import TermsOfService from './pages/legal/TermsOfService.tsx';
import RefundPolicy from './pages/legal/RefundPolicy.tsx';

import ScrollToTop from './components/ScrollToTop';
import AccountConfirmation from './components/AccountConfirmation';
import Header from "./components/Header";
import Footer from "./components/Footer";

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CheckoutProvider } from "./context/CheckoutContext";


function App() {
  return (
    <CartProvider>
      <AuthProvider>
        {/* 2. Cookie Banner */}
        <CheckoutProvider>

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
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </Router>
        </CheckoutProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
