import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error(error))
  }, [])
  console.log('products', products)

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
                {(product.default_price.unit_amount / 100).toFixed(2)}{' '}
                {product.default_price.currency.toUpperCase()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsPage
