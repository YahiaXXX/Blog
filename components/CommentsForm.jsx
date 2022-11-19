import React,{useState,useEffect} from 'react'
import { useRef } from 'react'

function CommentsForm({slug}) {
  const [error,setError]=useState(false)
  const [showSuccessMsg,setShowSuccessMsg]=useState(false)
  const commentEl=useRef()
  const nameEl=useRef()
  const emailEl=useRef()
  const storeDataEl=useRef()

  useEffect(()=>{
    nameEl.current.value=window.localStorage.getItem('name')
    emailEl.current.value=window.localStorage.getItem('email')

  },[])
  const submitComment = async (x) => {

    const res = await fetch('/api/comments',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(x)
    }) 
     return res.json()
  
  
  }

  const handleCommentSubmit=()=>{
    setError(false);
    if(!commentEl.current.value ||!nameEl.current.value ||!emailEl.current.value){
      setError(true)
      return
    }
    const commentObj = {
      name:nameEl.current.value,
      email:emailEl.current.value,
      comment:commentEl.current.value,
      slug:slug
    };
    if(storeDataEl.current.checked){
      window.localStorage.setItem("name",nameEl.current.value)
      window.localStorage.setItem("email",emailEl.current.value)
    } else{
      window.localStorage.removeItem("name",nameEl.current.value)
      window.localStorage.removeItem("email",emailEl.current.value)
    }

    submitComment(commentObj).then(()=>{
      setShowSuccessMsg(true);
      setTimeout(()=>{
        setShowSuccessMsg(false)

      },3000)
      nameEl.current.value="";
      emailEl.current.value="";
      commentEl.current.value="";
    
    
    })

  }

  return (
    <div className=' bg-white shadow-lg rounded-lg p-8 pb-12 mb-8' >
      <h3 className=' text-xl mb-8 font-semibold border-b pb-4' > Leave a reply</h3>
      <div className=' grid grid-cols-1 gap-4 mb-4' >
        <textarea 
        ref={commentEl} 
        className=" p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        placeholder='Comment'
        name="comment"
        
        />

      </div>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4' >
        <input 
        type="text" 
        ref={nameEl}  
        className=" py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        placeholder='Name'
        name="name"
        />
<input 
        type="text" 
        ref={emailEl}  
        className=" py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        placeholder='Email'
        name="email"
        />

      </div>
      <div className=' grid grid-cols-1 gap-4 mb-4' >
         <div>
          <input type="checkbox" ref={storeDataEl} id="storeData" name="storeData" value="true" />
          <label className=' text-gray-500 cursor-pointer ml-2' htmlFor="storeData">Save my infos for next time</label>
         </div>
      </div>
      {error && <p  className=' text-xs text-red-500' >All fields are required</p> }
      <div className=' mt8' >
        <button type='button' onClick={handleCommentSubmit} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer  " >
          Post Comment
        </button>
        {showSuccessMsg && <span className=' text-xl float-right font-semibold mt-3 text-green-500' >Comment submitted for review</span> }

      </div>
    </div>
  )
}

export default CommentsForm