import React from 'react'
import { useShop, CartItem } from './ShopContext'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import formatPrice from './utils'

let stripePromise: Promise<Stripe | null>
if (process.env.REACT_APP_STRIPE_PUBLIC_KEY) {
  stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
} else {
  console.error('Stripe public key is not set in environment variables')
  stripePromise = Promise.resolve(null)
}

const ShoppingCart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, currentUser } = useShop()

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(item.productId)
    } else {
      addToCart({ ...item, quantity: newQuantity })
    }
  }

  const handleCheckout = async () => {
    console.log('handleCheckout')
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    const stripe = await stripePromise
    const response = await fetch(
      'http://localhost:3001/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: currentUser,
          items: cartItems.map((item) => ({
            priceId: item.priceId,
            quantity: item.quantity,
          })),
        }),
      }
    )
    console.log('handleCheckout 2')
    const session = await response.json()

    stripe?.redirectToCheckout({
      sessionId: session.sessionId,
    })
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId}>
              Product: {item.name}
              <div>
                Price per unit:{' '}
                {formatPrice(
                  item.default_price.unit_amount,
                  item.default_price.currency
                )}
              </div>
              <div>
                Subtotal:{' '}
                {formatPrice(
                  item.default_price.unit_amount * item.quantity,
                  item.default_price.currency
                )}
              </div>
              <div>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item, parseInt(e.target.value))
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
      {cartItems.length > 0 && (
        <div>
          <strong>Total:</strong>{' '}
          {formatPrice(
            cartItems.reduce(
              (total, item) =>
                total + item.default_price.unit_amount * item.quantity,
              0
            ),
            cartItems[0].default_price.currency
          )}
        </div>
      )}
      <hr />
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default ShoppingCart
