import './App.css'
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ProductGrid from "./components/product-grid"
import CategoryFilter from "./components/category-filter"
import Pagination from "./components/pagination"
import SortingOptions from "./components/sorting"
import { fetchProducts, fetchCategories } from "./lib/api"
import ProductDetail from "./pages/product-detail"
// import CartIcon from './components/cart-icon'

function HomePage() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  // const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortOption, setSortOption] = useState("default")
  // const [cartItemCount, setCartItemCount] = useState(0)

  const productsPerPage = 12

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    getCategories()
  }, [])

  // fetches products when page, category, or sort option changes
  useEffect(() => {
    const getProducts = async () => {
      // setLoading(true)
      try {
        // offset pagination calculation
        const offset = (currentPage - 1) * productsPerPage

        // fetching products with filters
        const data = await fetchProducts({
          offset,
          limit: productsPerPage,
          categoryId: selectedCategory,
          sort: sortOption,
        })

        setProducts(data.products)

        // total pages based on total count
        const total = Math.ceil(data.total / productsPerPage)
        setTotalPages(total)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        // setLoading(false)
      }
    }

    getProducts()
  }, [currentPage, selectedCategory, sortOption])

  // handles category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1) 
  }

  // handles sort change
  const handleSortChange = (option) => {
    setSortOption(option)
    setCurrentPage(1)
  }

  // handles page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="my-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Gracie's Shop</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium">Filter by</span>
          <CategoryFilter categories={categories} selectedCategory={selectedCategory} onChange={handleCategoryChange} />
        </div>

        <div className="flex items-center gap-4">
          <SortingOptions onChange={handleSortChange} value={sortOption} />
        </div>
      </div>

      <ProductGrid products={products} />

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  )
}


function App() {
  return (
    <Router>
      <div className="max-w-7xl bg-green-100 mx-auto px-4 py-8 overflow-hidden ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App