import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react"
import { fetchProductById } from "../lib/api"
import { useParams, useNavigate } from "react-router-dom"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      try {
        const productData = await fetchProductById(id)
        if (productData) {
          setProduct(productData)
        }
      } catch (error) {
        console.error("Error fetching product details:", error)
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      getProduct()
    }
  }, [id])

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(0, quantity + amount)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      // add-to-cart logic would be here
    }
  }

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Product not found</h3>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Back to Products
        </button>
      </div>
    )
  }

  // discounted price
  const originalPrice = product.price
  const discountPercentage = 50 
  const discountedPrice = originalPrice * (1 - discountPercentage / 100)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate("/")}
        className="flex items-center text-sm font-medium mb-6 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Products
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* big image */}
          <div className="p-4 rounded-lg">
            <div className="bg-white rounded-lg overflow-hidden">
              <img 
                src={product.images[activeImageIndex] || product.images[0]} 
                alt={product.title}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
          </div>
          
          {/* image thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <div 
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`border-2 rounded-lg cursor-pointer p-1 ${
                  activeImageIndex === index ? "border-orange-500" : "border-transparent"
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm uppercase text-gray-500">
              {product.category?.name || "Sneakers Company"}
            </div>
            <h1 className="text-3xl font-bold">{product.title || "Fall Limited Edition Sneakers"}</h1>
          </div>
          
          <p className="text-gray-600">{product.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
              <span className="ml-3 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md font-bold text-sm">
                {discountPercentage}%
              </span>
            </div>
            <div className="text-gray-400 line-through">${originalPrice.toFixed(2)}</div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">

            <div className="flex items-center bg-gray-100 rounded-md">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-3 text-orange-500 hover:text-orange-700 focus:outline-none"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="px-4 py-2 font-bold">{quantity}</div>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-3 text-orange-500 hover:text-orange-700 focus:outline-none"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={quantity === 0}
              className={`flex items-center justify-center px-6 py-3 rounded-md ${
                quantity > 0 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}