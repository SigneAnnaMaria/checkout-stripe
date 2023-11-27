import React from 'react'
import { useShop } from './ShopContext'

const ShoppingCart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useShop()

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId)
    } else {
      addToCart({ productId, quantity: newQuantity })
    }
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId}>
              Product ID: {item.productId}
              <div>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.productId,
                      parseInt(e.target.value)
                    )
                  }
                  min="1"
                />
              </div>
              <button onClick={() => handleRemoveFromCart(item.productId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}

export default ShoppingCart
