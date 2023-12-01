import React from 'react'
import { Container, Alert, Button } from 'react-bootstrap'

const CheckoutFail: React.FC = () => {
  return (
    <Container>
      <Alert variant="danger">
        <Alert.Heading>Checkout Failed</Alert.Heading>
        <p>
          Unfortunately, there was an issue with your payment. Please try again.
        </p>
        {}
      </Alert>
      {}
      <Button variant="secondary" href="/cart">
        Back to Cart
      </Button>
      {}
    </Container>
  )
}

export default CheckoutFail
