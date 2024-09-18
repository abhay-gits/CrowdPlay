import React from 'react'

export const ChatBox = () => {
  return (
    <div className='border w-96 rounded-md p-2'>
        <div className='text-center bg-red-50 p-2 rounded'>
            Chat about Musix
        </div>
        <div className='bg-slate-400 rounded-b h-96'>

        </div>
        <div className='flex top-4 relative'>
            <input 
            type="text"
            placeholder="Type here"
            className=" input input-bordered input-sm w-full max-w-xs" />
            <button className="btn btn-sm">Small</button>
        </div>
    </div>
  )
}
