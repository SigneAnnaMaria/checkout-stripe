import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
}

interface CartItem {
  productId: string
  quantity: number
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
  loginUser: (email: string, password: string) => boolean
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
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [users, setUsers] = useState<User[]>([])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.productId === item.productId)
      if (existingItem) {
        return prevItems.map((i) =>
          i.productId === item.productId ? { ...i, quantity: item.quantity } : i
        )
      }
      return [...prevItems, item]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    )
  }

  const registerUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user])
  }

  const loginUser = (email: string, password: string) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    )
    if (foundUser) {
      setCurrentUser(foundUser.email)
      return true
    }
    return false
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
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
