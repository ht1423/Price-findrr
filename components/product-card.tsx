import { CardContent, Card } from "@/components/ui/card"
import Link from "next/link"

export function ProductCard({ product }: { product: any }) {
  const title =
    product.productTitle.length > 40
      ? product.productTitle.substring(0, 40) + "..."
      : product.productTitle

  return (
    <Link href={`/product/${product._id}`}>
      <Card className="w-80 h-[460px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out bg-white dark:bg-[#111827] m-4">
        <img
          src={product.image}
          alt="Product"
          className="w-full h-[220px] object-cover"
        />
        <CardContent className="p-4 flex flex-col justify-between h-[calc(100%-220px)]">
          <div className="mb-2 space-y-1">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              {title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              ⭐ {product.rating} / 5
            </p>
            <p
              className={`text-sm font-medium ${
                product.outOfStock
                  ? "text-red-500"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {product.outOfStock ? "Out of Stock" : "In Stock"}
            </p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {product.currency}
              {product.current_price}
            </span>
            <span className="text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-md text-zinc-800 dark:text-zinc-100">
              {product.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
