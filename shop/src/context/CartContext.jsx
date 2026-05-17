import React, { createContext, useContext, useState } from 'react'
 
const CartContext = createContext()
 
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
 
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        // If item already in cart, increase quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      // Otherwise add new item with quantity 1
      return [...prev, { ...product, quantity: 1 }]
    })
  }
 
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }
 
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }
 
  const clearCart = () => setCartItems([])
 
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
 
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )
 
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}
 
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider')
  }
  return context
}
 
export default CartContext