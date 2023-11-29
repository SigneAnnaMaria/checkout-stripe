import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

export interface Product {
  id: string
  name: string
  description: string
  images: string[]
  priceId: string
  default_price: {
    id: string
    unit_amount: number
    currency: string
  }
}

export interface CartItem {
  productId: string
  quantity: number
  priceId: string
  name: string
  default_price: {
    unit_amount: number
    currency: string
  }
}

interface User {
  email: string
  password: string
}

interface ShopContextType {
  currentUser: string | null
  setCurrentUser: (user: string | null) => void
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  registerUser: (user: User) => void
  loginUser: (email: string, password: string) => Promise<boolean>
  handleCheckoutSuccess: () => Promise<void>
}

const ShopContext = createContext<ShopContextType | undefined>(undefined)

export const useShop = () => {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
}

export const ShopProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    const savedUser = localStorage.getItem('currentUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      console.log('newItem', newItem)
      const existingItemIndex = prevItems.findIndex(
        (i) => i.productId === newItem.productId
      )

      if (existingItemIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: newItem.quantity, priceId: newItem.priceId }
            : item
        )
      } else {
        return [...prevItems, newItem]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    )
  }

  const registerUser = async (user: User) => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      if (response.ok) {
        console.log('Registration successful')
      } else {
        console.error('Registration failed')
      }
    } catch (error) {
      console.error('Error during registration: ', error)
    }
  }

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (response.ok) {
        setCurrentUser(email)
        return true
      } else {
        console.error('Login failed')
        return false
      }
    } catch (error) {
      console.error('Error during login: ', error)
      return false
    }
  }

  const handleCheckoutSuccess = async () => {
    console.log('handleCheckoutSuccess is running for user: ', currentUser)
    if (!currentUser) {
      console.error('No current user for checkout')
      return
    }

    const orderDetails = {
      user: currentUser,
      items: cartItems,
    }
    console.log('handleCheckoutSuccess, orderDetails', orderDetails)
    try {
      await fetch('http://localhost:3001/confirm-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      })

      setCartItems([])
    } catch (error) {
      console.error('Error confirming order: ', error)
    }
  }

  return (
    <ShopContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        cartItems,
        addToCart,
        removeFromCart,
        registerUser,
        loginUser,
        handleCheckoutSuccess,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
