import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ProductDetail from "./pages/product-detail"
import HomePage from "./pages/products-page"
import CartPage from "./pages/cart-page"
import { CartProvider } from "./context/cart-context"

export default function App() {

  return (
    <CartProvider>
      <Router>
        <div className="max-w-7xl bg-green-100 mx-auto px-4 py-8 overflow-hidden ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}
