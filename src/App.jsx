import './App.css'
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ProductDetail from "./pages/product-detail"
import HomePage from "./pages/products-page"

function App() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems(prev => {
      // checks if the product id already exists
      const exists = prev.some(item => item.id === product.id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  return (
    <Router>
      <div className="max-w-7xl bg-green-100 mx-auto px-4 py-8 overflow-hidden ">
        <Routes>
          <Route path="/" element={<HomePage cartCount={cartItems.length}/>} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} cartCount={cartItems.length}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App