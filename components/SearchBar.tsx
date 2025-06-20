"use client"
import { FormEvent, useState } from "react"
import { scraper } from "../server/actions/index"
import { toast } from "react-toastify"

const Search = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const urlValidator = (url: string) => {
    try {
      const parsedUrl = new URL(url)
      const hostname = parsedUrl.hostname
      if(
        hostname.includes("www.amazon.in") || 
        hostname.includes("amazon.in") ||
        hostname.endsWith("amazon")
      ){
        return true
      }
      return false
    } catch(e) {
      return false
    }
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const pass = urlValidator(search)
    pass ? toast.success("Valid URL") : toast.error("Invalid URL")
    try {
      setLoading(true)
      const product = await scraper(search)
    } catch(err){

    } finally {
      setLoading(false)
    }
  }
  return (
    <form className='flex flex-wrap justify-between w-full gap-4' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="drop any amazon product link here..." 
          className="flex-1 min-w-[300px] p-2  rounded-lg shadow-xs text-lg text-white focus:outline-none bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-gray-700 transition-all duration-300 ease-in-out" 
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-zinc-900 rounded-lg shadow-xs px-5 py-1 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-300 ease-in-out hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
    </form>
  )
}

export default Search