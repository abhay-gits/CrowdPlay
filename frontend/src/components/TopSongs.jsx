import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import album from '../../public/Designer.svg'
export const TopSongs = () => {
  const [songName, setSongName] = useState([]);
  console.log(songName)
  useEffect(() => {
    socket.emit('initialFetch');
    socket.on('updateTopSongs', (songList) => {
      setSongName(songList)
    })
  }, [])
  return (
    <div>
        <h1>Upcoming Songs</h1>
      <div className="overflow-x-auto overflow-y-auto h-60 ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th>Album</th>
              <th>Song</th>
              <th>Votes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {
            songName?.map((song,index) =>(
            <tr key={index}>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
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
