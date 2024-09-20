import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import album from '/Designer.svg'
export const TopSongs = ({userId}) => {
  const [songName, setSongName] = useState([]);
  useEffect(() => {
    socket.emit('initialFetch');
    const handleTopSongs = (songList) => {
      setSongName(songList);
    }
    socket.on('updateTopSongs', handleTopSongs)
    return () => {
      socket.off('updateTopSongs', handleTopSongs)
    }
  }, [])

  const handleLike = (id,name) => {
    id;
    name;
    const mail = userId;
    
    socket.emit('upvote', {id,name,mail})
  };
  return (
    <div className='h-5/6 border overflow-y-auto w-full rounded-md shadow-sm p-4 bg-white'>
      <h1 className='text-2xl font-medium mb-3'>Top Songs</h1>
      <div className="overflow-y-hidden">
        <table className="table">
          {/* head */}
          <thead>
            <tr className='text-sm'>
              <th>Album</th>
              <th>Song</th>
              <th>Votes</th>
              <th>Like</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {
              songName?.map((song, index) => (
                <tr key={index} onClick={()=>{handleLike(song.Id,song.name)}}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={album}
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {song.name}
                  </td>
                  <td>{song.score}</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
