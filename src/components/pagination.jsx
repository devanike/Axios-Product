import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // generates page numbers to display
  const getPageNumbers = () => {
    const pages = []

    // always show first page
    pages.push(1)

    // calculates range of pages to show around current page
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    // adds ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("ellipsis-start")
    }

    // adds pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // adds ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("ellipsis-end")
    }

    // always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center mt-8 mb-4">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full mr-2 ${
          currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span key={`${page}-${index}`} className="px-2 py-1 mx-1 text-gray-500">
                ...
              </span>
            )
          }

          // Handle page numbers
          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 mx-1 rounded-full flex items-center justify-center text-sm ${
                currentPage === page ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        })}
      </div>

      {/* next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ml-2 ${
          currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
