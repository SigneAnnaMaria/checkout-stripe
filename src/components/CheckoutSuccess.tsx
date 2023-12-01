import React, { useEffect } from 'react'
import { useShop } from './ShopContext'
import { Container, Alert, Button } from 'react-bootstrap'

const CheckoutSuccess: React.FC = () => {
  const { handleCheckoutSuccess } = useShop()

  useEffect(() => {
    handleCheckoutSuccess()
  }, [])

  return (
    <Container>
      <Alert variant="success">
        <Alert.Heading>Checkout Successful</Alert.Heading>
        <p>Your order has been placed successfully.</p>
      </Alert>
      <Button variant="primary" href="/products">
        Back to Shop
      </Button>
    </Container>
  )
}

export default CheckoutSuccess
