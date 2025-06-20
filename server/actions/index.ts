"use server"
import { scrapeProduct } from "../scraping";
import { connect } from "../mongoose";
import {Product} from "../models/product.model";
import { getLowestPrice, getHighestPrice, getAveragePrice } from "../utils";
import { revalidatePath } from "next/cache";
import { setEmailBody, sendEmail } from "../mailService";
import { redirect } from "next/navigation";

export async function scraper(productUrl: string) {
    if(!productUrl) {
        return;
    }
    try{
        connect()
        const scrapeRes = await scrapeProduct(productUrl)
        if(!scrapeRes){
            return;
        }
        let product = scrapeRes
        var isExisting = await Product.findOne({url: scrapeRes.url})  
        
        if(isExisting) {
            const newPriceHistory = [
                ...isExisting.priceHistory,
                { price: scrapeRes.current_price, date: new Date() }
            ]

            product = {
                ...scrapeRes,
                priceHistory: newPriceHistory,
                lowestPrice: getLowestPrice(newPriceHistory), 
                highestPrice: getHighestPrice(newPriceHistory),
                averagePrice: getAveragePrice(newPriceHistory)
            }
        }

        var newProduct = await Product.findOneAndUpdate(
            {url: scrapeRes.url},
            product,
            {upsert: true, new: true}
        );
        revalidatePath(`/product/${newProduct._id}`);
    } catch(err: any){
        throw new Error(`Scraping failed: ${err}`)
    }
    isExisting ? redirect(`/product/${isExisting._id}`) : redirect(`/product/${newProduct._id}`)
}

export async function getProduct(productId: string) {
    try{
        connect()
        const product = await Product.findById(productId)
        if(!product) {
            return null;
        }
        return product
    } catch(err: any){
        console.log(err)
    }
}

export async function getAllProducts(){
    try{
        revalidatePath('/trending')
        connect()
        const products = await Product.find({})
        if(!products) {
            return null;
        }
        return products
    } catch(err: any){
        console.log(err)
    }
}

export async function getSimilar(productId: string){
    try{
        connect()
        const product = await Product.findById(productId)
        if(!product) {
            return null;
        }

        const similarProduct = await Product.find({
            _id: {$ne: product._id},
            category: product.category
        }).limit(4)

        return similarProduct
    } catch (err: any){
        console.log(err)
    }
}

export async function setEmail(productId: string | string[], inputEmail: string) {
    try {
      console.log("📩 setEmail triggered with:", productId, inputEmail);
  
      connect();
      const product = await Product.findById(productId);
      if (!product) {
        console.warn("❌ Product not found.");
        return null;
      }
  
      const isTracking = product.users.some((user: { email: string }) => user.email === inputEmail);
      
      
  
      product.users.push({ email: inputEmail });
      const emailAdded = await product.save();
      console.log("✅ Email added to product:", emailAdded._id);
  
      const emailBody = await setEmailBody(product, "WELCOME");
      console.log("📨 Email body generated");
  
      await sendEmail(emailBody, [inputEmail]);
      console.log("✅ Email send attempt finished");
    } catch (err: any) {
      console.error("❌ setEmail failed:", err);
      throw err;
    }
  }
  