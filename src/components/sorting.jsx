import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function SortingOptions({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  // sorting options
  const options = [
    { value: "default", label: "Default Sorting" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ]

  // gets the label for the current value
  const currentLabel = options.find((option) => option.value === value)?.label || "Default Sorting"

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full min-w-[180px] px-4 py-2 text-sm border rounded-md bg-white"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{currentLabel}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
          <ul className="py-1" role="listbox">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-50" : ""
                }`}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={value === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
