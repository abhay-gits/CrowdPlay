import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';

export const TopSongs = () => {
  const [songName, setSongName] = useState([]);
    useEffect(()=>{
        socket.on('updateTopSongs',(songList)=>{
            setSongName(songList)
        })
    },[])
  return (
    <div>
      {
        songName.map((song,index) =>(
          <p key={index}>{song.name}  {song.score}</p>
        ))
      }
    </div>
  )
}
