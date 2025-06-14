import { connect } from "../../../server/mongoose"
import { Product } from "../../../server/models/product.model"
import { scrapeProduct } from "../../../server/scraping"
import { emailRemindType, getAveragePrice, getHighestPrice, getLowestPrice } from "../../../server/utils"
import { setEmailBody, sendEmail } from "../../../server/mailService"
import { NextResponse } from "next/server"

export const maxDuration = 60
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    await connect()

    const productList = await Product.find({})
    if (!productList) throw new Error("Failed to get products")

    const updatedProducts = await Promise.all(
      productList.map(async (product) => {
        try {
          const scrapeRes = await scrapeProduct(product.url)
          if (!scrapeRes) throw new Error("Failed to scrape product")

          const newPriceHistory = [
            ...product.priceHistory,
            { price: scrapeRes.current_price, date: new Date() }
          ]

          const updatedProductData = {
            ...scrapeRes,
            priceHistory: newPriceHistory,
            lowestPrice: getLowestPrice(newPriceHistory),
            highestPrice: getHighestPrice(newPriceHistory),
            averagePrice: getAveragePrice(newPriceHistory),
          }

          const updatedProduct = await Product.findOneAndUpdate(
            { url: scrapeRes.url },
            updatedProductData,
            { upsert: true, new: true }
          )

          const emailReminderType = emailRemindType(scrapeRes, product)

          if (emailReminderType && updatedProduct.users.length > 0) {
            const productData = {
              productTitle: updatedProduct.productTitle,
              url: updatedProduct.url,
            }

            const emailContent = await setEmailBody(productData, emailReminderType)

            const userEmailList = updatedProduct.users.map((user: { email: string }) => user.email)

            await sendEmail(emailContent, userEmailList)
          }

          return updatedProduct
        } catch (error) {
          console.error(`Failed updating product ${product.url}`, error)
          return product
        }
      })
    )

    return NextResponse.json(
      {
        msg: "Success",
        products: updatedProducts,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json({ msg: "Error occurred", error: err.toString() }, { status: 500 })
  }
}
