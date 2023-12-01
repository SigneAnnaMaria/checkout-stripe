import React, { useState } from 'react'
import { useShop, RegistrationResult } from './ShopContext'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { registerUser } = useShop()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result: RegistrationResult = await registerUser({ email, password })
    setMessage(result.message)
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Register</h2>
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
              Register
            </Button>
          </Form>
          {message && (
            <Alert variant={message.includes('success') ? 'success' : 'danger'}>
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Register
