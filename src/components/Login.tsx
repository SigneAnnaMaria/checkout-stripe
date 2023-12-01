import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from './ShopContext'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap' // Import Bootstrap components

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { loginUser } = useShop()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await loginUser(email, password)
    if (success) {
      setMessage('Login successful')
      navigate('/products')
    } else {
      setMessage('Invalid credentials')
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          {message && (
            <Alert
              variant={message === 'Login successful' ? 'success' : 'danger'}
            >
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Login
