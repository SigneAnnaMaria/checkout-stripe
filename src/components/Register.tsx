import React, { useState } from 'react'
import { useShop } from './ShopContext'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { registerUser } = useShop()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerUser({ email, password })
      setMessage('Registration successful')
    } catch (error) {
      setMessage('Registration failed')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Register
