import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"

function getAutoCompleteQuerys(query: string): Promise<string[]> {

  const fruits = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant, Blueberry', 'Boysenberry', 'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry', 'Coconut', 'Cranberry', 'Cucumber', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Goji berry', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeydew', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Lychee', 'Mango', 'Marion', 'Melon', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Olive', 'Orange', 'Blood orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Prune', 'Pineapple', 'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple mangosteen', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salal', 'Salak', 'Satsuma', 'Star', 'Strawberry', 'Tamarillo', 'Tamarind', 'Tomato', 'Ugli', 'Iphone', 'Samsung', 'Oneplus', 'Redmi', 'Oppo', 'Vivo', 'Realme', 'Google', 'Pixel', 'Nokia', 'Asus', 'Lenovo', 'Huawei', 'Motorola', 'Micromax', 'Lava', 'Xiaomi', 'Sony', 'LG', 'HTC', 'Macbook', 'Macbook Pro', 'Air', 'Mini', 'Pro 13', 'Pizza', 'Burger', 'Pasta', 'Noodles', 'Biryani', 'Kebab', 'Chicken', 'Mutton', 'Fish', 'Egg', 'Rice', 'Bread', 'Butter', 'Cheese', 'Milk', 'Coffee', 'Tea', 'Coke', 'Pepsi', 'Sprite', 'Fanta', 'Thumbs Up', 'Down', 'Like', 'Dislike', 'Heart', 'Love', 'Hate', 'Happy', 'Sad', 'Angry', 'Cry', 'Laugh', 'Smile', 'Laughing', 'Smiling', 'Crying', 'Sandwich', 'Salmonberry'];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fruits.filter((fruit) => fruit.toLowerCase().includes(query.toLowerCase())))
    }, Math.random() * 1000)
  })
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default function Home() {

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    setResults([])
    if (debouncedQuery) {
      getAutoCompleteQuerys(debouncedQuery).then(results => {
        setResults(results)
      })
    }
  }, [debouncedQuery])

  return (
    <>
      <Head>
        <title>Auto Complete Search</title>
        <meta name="description" content="Auto Complete Search component built with Next.js, Framer Motion and Tailwind CSS. It uses a debounce hook to delay the API call." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-2xl mx-auto flex flex-col mt-32 md:mt-52 items-center p-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-4">
          Auto Complete Search
        </motion.h1>
        <p className="text-gray-500 text-center py-2">
          Auto Complete Search component built with Next.js, Framer Motion and Tailwind CSS. It uses a debounce hook to delay the API call.
        </p>
        <div className="relative w-full">
          <input
            type="text"
            className="inputBox"
            placeholder="Search for fruits, phones, laptops, food, etc."
            value={query}
            onChange={e => setQuery(e.target.value)} />
        </div>
        <span className={`text-gray-500 text-sm mt-2 ${results.length === 0 ? 'hidden' : ''}`}>
          Search results for <span className="">{query}</span> matches <span className="underline">{results.length}</span> items
        </span>
        <div
          className={`w-full overflow-y-auto max-h-64 mt-4 group bg-white border border-gray-300 rounded-md shadow-sm ${results.length === 0 ? 'hidden' : ''}`}>
          {results.map((result, index) => (
            <motion.span
              key={index}
              className="queryLists"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}>
              {result.toLowerCase().includes(query.toLowerCase()) ? (
                <span className="text-gray-500">
                  {result.slice(0, result.toLowerCase().indexOf(query.toLowerCase()))}
                  <span className="text-blue-600">{query}</span>
                  {result.slice(result.toLowerCase().indexOf(query.toLowerCase()) + query.length)}
                </span>
              ) : (
                <span className="text-gray-500">{result}</span>
              )}
            </motion.span>
          ))}
        </div>
      </div>
      <footer className="max-w-2xl mx-auto flex flex-col items-center p-4">
        <p className="text-sm text-gray-500">Made with ❤️ by <a href="https://github.com/sauravhathi" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Saurav Hathi</a></p>
      </footer>
    </>
  )
}