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
    try {
        const res = await fetch(`https://price-findrr-three.vercel.app/api/product/${productId}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;

        const data = await res.json();
        return data.product; // based on your API's response shape
    } catch (err) {
        console.log("Fetch getProduct error:", err);
        return null;
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

export async function getSimilar(productId: string) {
    try {
        const res = await fetch(`https://price-findrr-three.vercel.app/api/similar/${productId}`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];

        const data = await res.json();
        return data.products; // adjust this line based on your API response
    } catch (err) {
        console.log("Fetch getSimilar error:", err);
        return [];
    }
}


export async function setEmail(productId:  string | string[], inputEmail: string) {
    try{
        connect()
        const product = await Product.findById(productId)
        if(!product) {
            return null;
        }
        const isTracking = product.users.some((user: {email: string}) => user.email === inputEmail);

        if(isTracking){
            return false
        }

        product.users.push({email: inputEmail})
        const emailAdded = await product.save()

        const emailBody = await setEmailBody(product, "WELCOME")

        await sendEmail(emailBody, [inputEmail])
    } catch(err: any){
        console.log(err)
    }
}