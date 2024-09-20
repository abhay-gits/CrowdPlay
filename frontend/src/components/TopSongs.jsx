import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import album from '/Designer.svg'
export const TopSongs = () => {
  const [songName, setSongName] = useState([]);
  useEffect(() => {
    socket.emit('initialFetch');
   const handleTopSongs = (songList)=>{
    setSongName(songList);
   }
   socket.on('updateTopSongs',handleTopSongs)
    return ()=>{
      socket.off('updateTopSongs',handleTopSongs)
    }
  }, [])
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
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {
            songName?.map((song,index) =>(
            <tr key={index}>
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
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
