import React, { useState } from 'react'
import { useShop, CartItem } from './ShopContext'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import formatPrice from './utils'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap'

let stripePromise: Promise<Stripe | null>
if (process.env.REACT_APP_STRIPE_PUBLIC_KEY) {
  stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
} else {
  console.error('Stripe public key is not set in environment variables')
  stripePromise = Promise.resolve(null)
}

const ShoppingCart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, currentUser } = useShop()
  const navigate = useNavigate()
  const [discountCode, setDiscountCode] = useState('')
  const [discountStatus, setDiscountStatus] = useState('')

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

  const applyDiscountCode = () => {
    setDiscountStatus('Discount code applied')
  }

  const handleCheckout = async () => {
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
          discountCode,
        }),
      }
    )
    const session = await response.json()

    if (session.error) {
      setDiscountStatus(session.error)
      return
    }

    stripe?.redirectToCheckout({
      sessionId: session.sessionId,
    })
  }

  const handleLoginToOrder = () => {
    navigate('/login')
  }

  return (
    <Container>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 && (
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <FormControl
                placeholder="Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={applyDiscountCode}>
                Apply
              </Button>
            </InputGroup>
            {discountStatus && <div>{discountStatus}</div>}{' '}
          </Col>
        </Row>
      )}

      {currentUser ? (
        <Row className="justify-content-end mb-3">
          <Col md="auto">
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-end mb-3">
          <Col md="auto">
            <Button variant="secondary" onClick={handleLoginToOrder}>
              Log In to Order
            </Button>
          </Col>
        </Row>
      )}

      {cartItems.length > 0 ? (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroupItem key={item.productId}>
              <Row>
                <Col md={4}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={item.images[0]}
                      alt={item.name}
                      className="p-5"
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        Price per unit:{' '}
                        {formatPrice(
                          item.default_price.unit_amount,
                          item.default_price.currency
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={8}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Quantity</InputGroup.Text>
                    <FormControl
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, parseInt(e.target.value))
                      }
                      min="1"
                    />
                  </InputGroup>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    Remove
                  </Button>
                  <div>
                    Subtotal:{' '}
                    {formatPrice(
                      item.default_price.unit_amount * item.quantity,
                      item.default_price.currency
                    )}
                  </div>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        <p>Your cart is empty</p>
      )}

      {cartItems.length > 0 && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>
              <strong>Total:</strong>
            </Card.Title>
            <Card.Text>
              {formatPrice(
                cartItems.reduce(
                  (total, item) =>
                    total + item.default_price.unit_amount * item.quantity,
                  0
                ),
                cartItems[0].default_price.currency
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default ShoppingCart
