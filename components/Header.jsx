import React,{useContext,useState,useEffect} from 'react'
import Link from "next/link"
import {getCategories} from "../services/index"


function Header() {
    const [categ,setCateg]=useState([])
    const getC = async () => {
      const res = await getCategories()
      setCateg(res)
   }
    useEffect(()=>{
      getC()
      },[])
  return (
    <div className='container mx-auto px-10 mb-8' >
        <div className='border-b w-full inline-block border-blue-400 py-8' >
            <div className='md:float-left block ' >
             <Link href="/" >
                <span className=' cursor-pointer font-bold text-4xl text-white' >
                  Blog
                </span>
             </Link>
            </div>
            <div className=' hidden md:float-left md:contents' >
                {categ.map(cat=>(
                    <Link key={cat.slug} href={`/category/${cat.slug}`} >
                        <span className=' md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer' >
                            {cat.name}
                        </span>
                    </Link>
                ))}

            </div>
        </div>
    </div>
  )
}

export default Header