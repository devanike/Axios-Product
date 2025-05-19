
import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0)
    setCartCount(count)
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // check if the product is already in the cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex > -1) {
        // if it exists, update the quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // if it doesn't exist, add it as a new item
        return [...prevItems, { ...product, quantity: quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price * (1 - (item.discountPercentage || 0) / 100)
      return total + price * item.quantity
    }, 0)
  }

  const clearCart = () => {
    setCartItems([])
  }

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
