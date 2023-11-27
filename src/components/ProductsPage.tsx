import React, { useEffect, useState } from 'react'
import { useShop } from './ShopContext'

interface Product {
  id: string
  name: string
  description: string
  images: string[]
  default_price: {
    unit_amount: number
    currency: string
  }
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart, cartItems } = useShop()

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error(error))
  }, [])

  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toLocaleString('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    })
  }

  const handleAddToCart = (productId: string) => {
    const existingCartItem = cartItems.find(
      (item) => item.productId === productId
    )

    if (existingCartItem) {
      addToCart({ productId, quantity: existingCartItem.quantity + 1 })
    } else {
      addToCart({ productId, quantity: 1 })
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {product.images[0] && (
              <img src={product.images[0]} alt={product.name} />
            )}
            {product.default_price && (
              <p>
                {formatPrice(product.default_price.unit_amount)}{' '}
                {product.default_price.currency.toUpperCase()}
              </p>
            )}
            <button onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsPage
