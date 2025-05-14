import  { Link } from 'react-router-dom'

function ProductGrid({ products }) {

  // if no products are found
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-gray-500 mt-2">Try changing your filters or search term</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
      {products.map((product) => (
        <Link 
          to={`/product/${product.id}`} 
          key={product.id} 
          className="group hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
        >
          {/* card */}
          <div className="flex flex-col">
            {/* product image */}
            <div className="overflow-hidden bg-white">
              <div className="aspect-square w-full">
                <img
                  src={product.images[0] || "https://placehold.co/300x300"}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>  

              {/* product info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-medium text-lg mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between">
                  <p className="font-bold text-lg mb-2 sm:mb-0">${product.price.toFixed(2)}</p>
                  <span className="inline-block text-xs bg-gray-100 rounded-full px-2 py-1">
                    {product.category.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid
