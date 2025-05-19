import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom"
import ProductGrid from "../components/product-grid"
import CategoryFilter from "../components/category-filter"
import Pagination from "../components/pagination"
import SortingOptions from "../components/sorting"
import { fetchProducts, fetchCategories } from "../lib/api"
import { useCart } from "../context/cart-context"

export default function HomePage() {
  const { cartCount } = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortOption, setSortOption] = useState("default")

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
      try {
        // pagination calculation
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
      }
    }

    getProducts()
  }, [currentPage, selectedCategory, sortOption])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1) 
  }

  const handleSortChange = (option) => {
    setSortOption(option)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="my-8">
      <div className="mb-8 flex justify-between">
        <h1 className="text-4xl font-bold mb-2">Gracie's Shop</h1>
        <Link to="/cart" className="relative ml-4 flex items-center text-gray-600">
          <ShoppingCart size={24}/>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
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
