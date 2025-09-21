import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Kontakt from './pages/Kontakt';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from './pages/productDetails/ProductDetail';
import Cart from "./pages/Cart";
import ScrollToTop from './components/ScrollToTop';
import Products from './pages/Products';
import { CartProvider } from './context/CartContext';
import CheckoutScreen from './pages/Checkout';
import OrderSuccessScreen from './pages/OrderSuccessScreen';

function App() {
  return (
    <>
      <Router>
        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Header */}
        <Header />

        {/* Main Content*/}
        <main style={{ display: "flex", flexDirection: "column", minHeight: "90vh"}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Kontakt" element={<Kontakt />} />
            <Route path="/products/:id" element={<ProductDetail />} /> {/* Every product is identified by an unique ID */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/order/:id" element={<OrderSuccessScreen />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
