import { PriceCard } from '@/components/price-card'
import { getProduct, getSimilar } from '@/server/actions'
import { redirect } from 'next/navigation'
import { FaGaugeHigh } from "react-icons/fa6"
import { BsChevronDoubleUp, BsChevronDoubleDown, BsAlignMiddle } from "react-icons/bs"
import { CiStar } from "react-icons/ci"
import { MdCategory } from "react-icons/md"
import { RiShareForwardBoxFill } from "react-icons/ri"
import Link from 'next/link'
import { PiGhostBold } from "react-icons/pi"
import { SimilarProductCard } from '@/components/similar-product-card'
import { DialogModal } from '@/components/dialog'

interface pageProps {
  params: {
    id: string
  }
}

const page = async ({ params: { id } }: pageProps) => {
  const product = await getProduct(id)
  if (!product) redirect('/')

  const substring = product.productTitle.substring(0, 40)
  const similarProduct = await getSimilar(id)

  return (
    <div className="w-full min-h-screen relative overflow-hidden text-white pb-24">
      {/* Premium Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-gray-900/30"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.08),transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.05),transparent_50%)] animate-pulse delay-1000"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,92,246,0.03)_50%,transparent_75%)] bg-[length:400%_400%] animate-gradient"></div>

      <div className="relative z-10">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 pt-24">

          {/* Product Image - Enhanced Glass Effect */}
          <div className="group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.productTitle}
                  className="w-full h-[450px] object-contain rounded-2xl group-hover:scale-105 transition duration-500"
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          {/* Product Info - Enhanced Typography & Spacing */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-2xl bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                {product.productTitle === substring ? product.productTitle : substring + "..."}
              </h1>

              {/* Enhanced Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <CiStar className="text-yellow-400 text-xl drop-shadow-lg" />
                  <span className="text-gray-300 text-lg font-semibold">{product.rating}</span>
                </div>
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                <span className="text-gray-400 text-sm font-medium">Verified Product</span>
              </div>
            </div>

            {/* Enhanced Category & Link */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/60 to-pink-600/60 backdrop-blur-md border border-purple-500/30 rounded-xl text-sm text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                <MdCategory className="text-purple-300" /> 
                <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">{product.category}</span>
              </div>
              <Link 
                href={product.url} 
                target="_blank" 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 group"
              >
                <RiShareForwardBoxFill className="text-lg group-hover:rotate-12 transition-transform duration-300" /> 
                Visit Product Page
              </Link>
            </div>

            {/* Enhanced Price Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <PriceCard amount={product.current_price} type='Current Price' currency={product.currency} label={<BsChevronDoubleUp />} />
              <PriceCard amount={product.lowestPrice} type='Lowest Price' currency={product.currency} label={<BsChevronDoubleDown />} />
              <PriceCard amount={product.averagePrice} type='Average Price' currency={product.currency} label={<BsAlignMiddle />} />
              <PriceCard amount={product.highestPrice} type='Highest Price' currency={product.currency} label={<FaGaugeHigh />} />
            </div>

            {/* Track Price Button */}
            <div className="pt-4">
              <DialogModal id={product._id} />
            </div>
          </div>
        </div>

        {/* Enhanced Similar Products Section */}
        <div className="mt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent mb-4">
                Similar Products
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            
            {similarProduct && similarProduct.length > 0 ? (
              <div className="flex flex-wrap gap-8 justify-center">
                {similarProduct.map((item, index) => (
                  <SimilarProductCard product={item} key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-16 py-16">
                <div className="relative">
                  <PiGhostBold className="w-16 h-16 text-gray-600" />
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"></div>
                </div>
                <p className="text-gray-400 mt-6 text-lg font-medium">No similar products found.</p>
                <p className="text-gray-500 mt-2 text-sm">We're working on finding more recommendations for you.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
