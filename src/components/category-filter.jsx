function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="pb-2">
      <div className="flex flex-wrap space-x-2">
        <button
          onClick={() => onChange(null)}
          className={`px-4 py-2 mb-2 text-sm rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === null ? "bg-black text-white" : "bg-white text-black "
          }`}
        >
          All Categories
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={`px-4 py-2 mb-2 text-sm rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.id ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
