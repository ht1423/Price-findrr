import Link from "next/link"

export function SimilarProductCard({product}: {product: any}) {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-black/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700">
        <div className="relative w-full h-[350px] overflow-hidden p-4 bg-gray-50 dark:bg-gray-950">
          <img
            alt={product.productTitle}
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 rounded-2xl shadow-sm dark:shadow-black/50"
            src={product.image}
          />
        </div>
        <div className="p-6 space-y-3 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-lg ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700'}`}>
                {i < (product.rating || 0) ? '⭐' : '☆'}
              </span>
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
              {product.rating || 0}
            </span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
            {product.productTitle}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {product.category}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
              {product.currency}{product.current_price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}