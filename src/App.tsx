import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import ProductsPage from './components/ProductsPage'
import Register from './components/Register'
import Login from './components/Login'
import ShoppingCart from './components/ShoppingCart'
import CheckoutSuccess from './components/CheckoutSuccess'
import CheckoutFail from './components/CheckoutFail'
import OrderHistory from './components/OrderHistory'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/products">Products</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/order-history">Order History</Link>{' '}
          </nav>

          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/checkout-fail" element={<CheckoutFail />} />
            <Route path="/order-history" element={<OrderHistory />} />{' '}
            <Route path="/" element={<ProductsPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  )
}

export default App
