import { useState } from 'react'
import { YoutubePlayer } from '../components/YoutubePlayer'
import { TopSongs } from '../components/TopSongs'
import { Navbar } from '../components/Navbar';
import { MusicCard } from '../components/MusicCard';
import { ChatBox } from '../components/ChatBox';


export const HomePage = ({ user, setUser }) => {

  const [videoInfo, setVideoInfo] = useState("");

  return (
    <div className='bg-white h-screen'>
      <Navbar
        setUser={setUser}
        userName={user.displayName}
        userImage={user.photos[0].value}
        setVideoInfo={setVideoInfo} />
      <div className='p-6 flex justify-between w-screen'>
        <TopSongs userId={user.id} />
        <MusicCard videoInfo={videoInfo} userId={user.id} />
        <YoutubePlayer />
        <ChatBox userName={user.displayName} />
      </div>
    </div>
  )
}