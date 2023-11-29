import React, { useEffect } from 'react'
import { useShop } from './ShopContext'

const CheckoutSuccess: React.FC = () => {
  const { handleCheckoutSuccess } = useShop()

  useEffect(() => {
    console.log('before handleCheckoutSuccess', handleCheckoutSuccess)
    handleCheckoutSuccess()
  }, [])

  return (
    <div>
      <h2>Checkout Successful</h2>
      <p>Your order has been placed successfully.</p>
    </div>
  )
}

export default CheckoutSuccess
