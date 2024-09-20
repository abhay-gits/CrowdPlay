import React from 'react';
import socket from '../utils/socket.js';

export const MusicCard = ({videoInfo,userId}) => {

  const handleUpvote = (video) => {
    const id = video.videoId;
    const name = video.name;
    const mail = userId;
    
    socket.emit('upvote', {id,name,mail})
  };

  return (
    <div>
        {videoInfo && (
        <div className="card bg-base-100 w-96 h-64 shadow-xl" key={videoInfo.videoId}>
          <figure className="px-10 pt-7">
            <img
              src={videoInfo.thumbnails[1].url}
              alt="album"
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
)
}
