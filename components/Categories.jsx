import React,{useState,useEffect} from 'react'
import Link from "next/link"
import {getCategories} from "../services/index"

function Categories() {
  const [categ,setCateg]=useState([])
  useEffect(()=>{
    getCategories().then(categories=>setCateg(categories))
    console.log(process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT)
  },[])
  return (
    <div className=' bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'  >
      <h3 className=' text-xl mb-8 font-semibold border-b pb-4' >
        Categories
      </h3>
      {categ.map(cat=>(
        <Link key={cat.slug} href={`/category/${cat.slug}`} >
          <span className=' cursor-pointer block pb-3 mb-3' >
            {cat.name}
          </span>
        </Link>
      ))}
      </div>
  )
}

export default Categories

