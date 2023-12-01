import React, { useState, useEffect } from 'react'
import { useShop } from './ShopContext'
import formatPrice from './utils'
import { Container, Card, ListGroup, Row, Col } from 'react-bootstrap'
interface OrderItem {
  productId: string
  quantity: number
  priceId: string
  name: string
  default_price: {
    unit_amount: number
    currency: string
  }
}
interface Order {
  dateTime: string
  items: OrderItem[]
}
const OrderHistory: React.FC = () => {
  const { currentUser } = useShop()
  const [userOrders, setUserOrders] = useState<Order[]>([])
  useEffect(() => {
    const fetchOrders = async () => {
      console.log('currentUser', currentUser)
      if (currentUser) {
        try {
          const response = await fetch(
            `http://localhost:3001/orders/${currentUser}`
          )
          if (response.ok) {
            console.log('history response.ok')
            const data = (await response.json()) as Order[]
            console.log('data', data)
            setUserOrders(data)
          } else {
            console.error('Failed to fetch orders')
          }
        } catch (error) {
          console.error('Error fetching orders:', error)
        }
      }
    }
    fetchOrders()
  }, [currentUser])
  return (
    <Container>
      <h2>Order History</h2>
      {userOrders.length > 0 ? (
        userOrders.map((order) => (
          <Card key={order.dateTime} className="mb-3">
            <Card.Header>
              <strong>Order: {order.dateTime}</strong>
            </Card.Header>
            <ListGroup variant="flush">
              {order.items.map((item) => (
                <ListGroup.Item key={item.productId}>
                  <Row>
                    <Col md={6}>
                      <strong>Product: {item.name}</strong>
                    </Col>
                    <Col md={6}>
                      <ul>
                        <li>Quantity: {item.quantity}</li>
                        <li>
                          Price per unit:{' '}
                          {formatPrice(
                            item.default_price.unit_amount,
                            item.default_price.currency
                          )}
                        </li>
                        <li>
                          Subtotal:{' '}
                          {formatPrice(
                            item.default_price.unit_amount * item.quantity,
                            item.default_price.currency
                          )}
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <strong>Order Total:</strong>{' '}
                {formatPrice(
                  order.items.reduce(
                    (total, item) =>
                      total + item.default_price.unit_amount * item.quantity,
                    0
                  ),
                  order.items[0].default_price.currency
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </Container>
  )
}
export default OrderHistory
