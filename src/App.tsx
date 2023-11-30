import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { useShop } from './components/ShopContext'
import ProductsPage from './components/ProductsPage'
import Register from './components/Register'
import Login from './components/Login'
import ShoppingCart from './components/ShoppingCart'
import CheckoutSuccess from './components/CheckoutSuccess'
import CheckoutFail from './components/CheckoutFail'
import OrderHistory from './components/OrderHistory'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useShop()
  return currentUser ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  const { currentUser, setCurrentUser } = useShop()

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/products')
    }
  }, [currentUser, navigate])

  const logoutUser = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  return (
    <div className="App">
      <header className="App-header">
        {currentUser && <div>Welcome, {currentUser}</div>}{' '}
        <nav>
          <Link to="/products">Products</Link>
          {!currentUser && <Link to="/register">Register</Link>}
          {!currentUser && <Link to="/login">Login</Link>}
          {currentUser && <Link to="/cart">Cart</Link>}
          {currentUser && <Link to="/order-history">Order History</Link>}
          {currentUser && <button onClick={logoutUser}>Logout</button>}
        </nav>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout-success"
            element={
              <ProtectedRoute>
                <CheckoutSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout-fail"
            element={
              <ProtectedRoute>
                <CheckoutFail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </header>
    </div>
  )
}

export default App
