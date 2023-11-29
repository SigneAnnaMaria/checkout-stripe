import React, { useState, useEffect } from 'react'
import { useShop } from './ShopContext'
import formatPrice from './utils'

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
      if (currentUser) {
        try {
          const response = await fetch(
            `http://localhost:3001/orders/${currentUser}`
          )
          if (response.ok) {
            const data = (await response.json()) as Order[]
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
    <div>
      <h2>Order History</h2>
      {userOrders.length > 0 ? (
        <ul>
          {userOrders.map((order) => (
            <li key={order.dateTime}>
              <h3>Order: {order.dateTime}</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.productId}>
                    <strong>Product: {item.name}</strong>
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
                  </li>
                ))}
                <hr />
                <strong>Order Total:</strong>{' '}
                {formatPrice(
                  order.items.reduce(
                    (total, item) =>
                      total + item.default_price.unit_amount * item.quantity,
                    0
                  ),
                  order.items[0].default_price.currency
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  )
}

export default OrderHistory
