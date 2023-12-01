import React, { useEffect, useState } from 'react'
import { useShop, Product } from './ShopContext'
import formatPrice from './utils'
import { Card, Button, Row, Col, Container, Alert } from 'react-bootstrap'

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [showSnackbar, setShowSnackbar] = useState(false)
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
      images: product.images,
      name: product.name,
      default_price: {
        unit_amount: product.default_price.unit_amount,
        currency: product.default_price.currency,
      },
    })
    setShowSnackbar(true)
    setTimeout(() => setShowSnackbar(false), 3000)
  }

  return (
    <Container>
      <h1 className="text-center my-4">Products</h1>
      {showSnackbar && (
        <Alert variant="success" className="text-center">
          Item added to cart!
        </Alert>
      )}
      <Row xs={1} md={3} lg={4} xl={5} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              {product.images[0] && (
                <Card.Img
                  variant="top"
                  src={product.images[0]}
                  alt={product.name}
                />
              )}
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                {product.default_price && (
                  <Card.Text>
                    {formatPrice(
                      product.default_price.unit_amount,
                      product.default_price.currency
                    )}
                  </Card.Text>
                )}
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ProductsPage
