import React, { useEffect, useState } from 'react'
import { useShop, Product } from './ShopContext'
import formatPrice from './utils'

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart, cartItems } = useShop()

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data)
      })
      .catch((error) => console.error(error))
  }, [])

  const handleAddToCart = (product: Product) => {
    const existingCartItem = cartItems.find(
      (item) => item.productId === product.id
    )
    const quantityToAdd = existingCartItem ? existingCartItem.quantity + 1 : 1

    addToCart({
      productId: product.id,
      quantity: quantityToAdd,
      priceId: product.default_price.id,
      name: product.name,
      default_price: {
        unit_amount: product.default_price.unit_amount,
        currency: product.default_price.currency,
      },
    })
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
                {formatPrice(
                  product.default_price.unit_amount,
                  product.default_price.currency
                )}{' '}
              </p>
            )}
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsPage
