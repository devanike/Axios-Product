
import { useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2, ChevronLeft, ShoppingBag } from "lucide-react"
import { useCart } from "../context/cart-context"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getSubtotal, cartCount } = useCart()
  const navigate = useNavigate()

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find((item) => item.id === productId)
    if (item) {
      updateQuantity(productId, item.quantity + change)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button onClick={() => navigate("/")} className="flex items-center text-sm font-medium mb-6 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </button>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {cartCount === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button onClick={() => navigate("/")} className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg">
              <div className="hidden md:grid grid-cols-5 text-sm font-medium text-gray-500 p-4 border-b text-center">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>

              {cartItems.map((item) => {

                const discountPercentage = item.discountPercentage || 0
                const discountedPrice = item.price * (1 - discountPercentage / 100)

                return (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border-b items-center">
                    {/* Product info */}
                    <div className="md:col-span-2 flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.images?.[0] || item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm flex items-center mt-2 hover:text-red-700"
                        >
                          <Trash2 size={14} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="md:text-center">
                      <span className="md:hidden text-gray-500 mr-2">Price:</span>${discountedPrice.toFixed(2)}
                      {discountPercentage > 0 && (
                        <div className="text-xs text-gray-400 line-through">${item.price.toFixed(2)}</div>
                      )}
                    </div>

                    <div>
                      <span className="md:hidden text-gray-500 mr-2">Quantity:</span>
                      <div className="flex items-center w-min border rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-2 text-gray-500 hover:text-black focus:outline-none"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-2 text-gray-500 hover:text-black focus:outline-none"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="font-medium">
                      <span className="md:hidden text-gray-500 mr-2">Total:</span>$
                      {(discountedPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping </span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
