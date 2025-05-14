import axios from "axios"

// this creates an axios instance with a base URL and timeout
const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  timeout: 10000, 
})

//  request interceptor 
// this interceptor runs before each request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    // For this public API, an auth token is not required.
    // If you were using an API that needs authentication:
    // const authToken = localStorage.getItem('authToken'); // Example: get token from storage
    // if (authToken) {
    //   config.headers["Authorization"] = `Bearer ${authToken}`;
    // }
    return config 
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error) 
  },
)

// --- response interceptor ---
// this interceptor runs after a response is received.
axiosInstance.interceptors.response.use(
  (response) => {
    return response 
  },
  (error) => {
    const { response } = error

    if (response) {
      console.error(`API Error: ${response.status}`, response.data)

      switch (response.status) {
        case 400:
          alert("Bad Request from API. Please check your input.")
          break
        case 401:
          alert("API returned Unauthorized. Please log in again.")
          break
        case 403:
          alert("API returned Forbidden. You do not have permission.")
          break
        case 404:
          // window.location.href = '/not-found';
          break
        case 500:
          alert("API returned an Internal Server Error. Please try again later.")
          break
        default:
          alert(`An unexpected API error occurred: ${response.status}`)
          break
      }
    } else {
      throw error;
      // window.location.href = '/network-error';
    }

    return Promise.reject(error)
  },
)

// this fetches products with filtering, pagination and sorting
export async function fetchProducts({ offset = 0, limit = 12, categoryId = null, sort = "default" } = {}) {
  try {
    let url = categoryId ? `/categories/${categoryId}/products` : "/products"

    // pagination parameters
    url += `?offset=${offset}&limit=${limit}`

    const response = await axiosInstance.get(url)
    let products = response.data

    // sorting
    if (sort !== "default") {
      products = sortProducts(products, sort)
    }

    // getting total count for pagination
    const total = products.length < limit ? offset + products.length : 1000

    return {
      products,
      total,
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      products: [],
      total: 0,
    }
  }
}

// fetching all categories
export async function fetchCategories() {
  try {
    const response = await axiosInstance.get("/categories")
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// fetching a single product by ID
export async function fetchProductById(id) {
  try {
    const response = await axiosInstance.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
}

// sort products based on the provided sort option

function sortProducts(products, sortOption) {
  const sortedProducts = [...products]

  switch (sortOption) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price)
    case "name-asc":
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
    case "name-desc":
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return sortedProducts
  }
}
