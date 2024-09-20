import React, { useState } from 'react'
import { YoutubePlayer } from '../components/YoutubePlayer'
import { TopSongs } from '../components/TopSongs'
import { Navbar } from '../components/Navbar';
import { MusicCard } from '../components/MusicCard';
import { ChatBox } from '../components/ChatBox';

export const HomePage = ({ user, setUser }) => {
  
  const [videoInfo, setVideoInfo] = useState("");
  return (
    <div>
      <Navbar 
      setUser={setUser} 
      userName={user.displayName} 
      userImage={user.photos[0].value} 
      setVideoInfo={setVideoInfo}/>
      <div className='p-6 flex justify-between w-screen h-screen gap-6 bg-gray-100'>  
        <div className='w-1/3'>
          <YoutubePlayer/>
          <MusicCard videoInfo={videoInfo} userId={user.id}/>
        </div>
        <div className='w-1/3'>
          <TopSongs userId={user.id}/>
        </div>
        <ChatBox userName={user.displayName}/>
      </div>
    </div>
  )
}