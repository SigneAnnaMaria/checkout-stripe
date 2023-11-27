import React, { useState } from 'react'
import ProductsPage from './components/ProductsPage'
import Register from './components/Register'
import Login from './components/Login'
import ShoppingCart from './components/ShoppingCart'

function App() {
  const [view, setView] = useState('products')

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setView('products')}>Products</button>
        <button onClick={() => setView('register')}>Register</button>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('cart')}>Cart</button>{' '}
        {view === 'products' && <ProductsPage />}
        {view === 'register' && <Register />}
        {view === 'login' && <Login />}
        {view === 'cart' && <ShoppingCart />}
      </header>
    </div>
  )
}

export default App
