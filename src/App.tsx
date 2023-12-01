import React from 'react'
import { Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom'
import { useShop } from './components/ShopContext'
import ProductsPage from './components/ProductsPage'
import Register from './components/Register'
import Login from './components/Login'
import ShoppingCart from './components/ShoppingCart'
import CheckoutSuccess from './components/CheckoutSuccess'
import CheckoutFail from './components/CheckoutFail'
import OrderHistory from './components/OrderHistory'
import { Navbar, Nav, Container } from 'react-bootstrap'
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useShop()
  return currentUser ? <>{children}</> : <Navigate to="/login" />
}
function App() {
  const { currentUser, setCurrentUser, itemCount } = useShop()
  const navigate = useNavigate()
  const logoutUser = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    navigate('/login')
  }
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/products">
            Chop Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              {!currentUser && (
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              )}
              {!currentUser && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/cart">
                Cart ({itemCount})
              </Nav.Link>
              {currentUser && (
                <Nav.Link as={Link} to="/order-history">
                  Order History
                </Nav.Link>
              )}
            </Nav>
            {currentUser && (
              <Nav>
                <Navbar.Text className="me-3">
                  Welcome, {currentUser}
                </Navbar.Text>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<ShoppingCart />} />
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
    </div>
  )
}
export default App
