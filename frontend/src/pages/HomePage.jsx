import React, { useState } from 'react'
import { YoutubePlayer } from '../components/YoutubePlayer'
import { MusicSearch } from '../components/MusicSearch'
import { TopSongs } from '../components/TopSongs'
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { MusicCard } from '../components/MusicCard';

export const HomePage = ({ user, setUser }) => {

  return (
    <div>
      <Navbar setUser={setUser} userName={user.displayName} userImage={user.photos[0].value}/>
      <div className='p-6'>
          <YoutubePlayer/>
          <MusicCard/>
          <MusicSearch/>
        <TopSongs />
      </div>
    </div>
  )
}