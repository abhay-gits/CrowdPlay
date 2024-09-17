import React, { useState } from 'react'
import socket from '../utils/socket.js';

export const MusicSearch = () => {

  const [videoInfo, setVideoInfo] = useState("");

  const HandleSearch = async () => {
    let input = document.getElementById('input');
    let inputValue = input.value;
    input.value = ""

    const queryParams = new URLSearchParams({ input: inputValue }).toString();


    const response = await fetch(`http://localhost:3000/api/video/info?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json()
    setVideoInfo(data)
  }

  const handleUpvote = (video) => {
    const id = video.videoId;
    const name = video.name;
    socket.emit('upvote', {id,name})
  };

  return (
    <div>
      {/* Input and Button */}
      <div className='flex gap-4'>
        <label className="input input-bordered flex items-center gap-2 w-72" >
          <input type="text" className="grow" placeholder="Search Music" id='input' />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <button className="btn btn-primary" onClick={() => HandleSearch()}>Search</button>
      </div>
      {/* Search Result */}
      {videoInfo && (
        <div className="card bg-base-100 w-96 shadow-xl" key={videoInfo.videoId}>
          <figure className="px-10 pt-10">
            <img
              src={videoInfo.thumbnails[1].url}
              alt="Shoes"
              className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{videoInfo.name}</h2>
            <div className="card-actions">
              <button className="btn" onClick={()=>handleUpvote(videoInfo)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="red"
                  viewBox="0 0 24 24"
                  stroke="red">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
