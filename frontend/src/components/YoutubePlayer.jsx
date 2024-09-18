import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import socket from '../utils/socket';

export const YoutubePlayer = () => {

  const playerRef = useRef(null);
  const [songId, setSongId] = useState("");
  const [volume, setVolume] = useState(50);
  
  useEffect(()=>{
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(tag, firstScript);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('player', {
        height: '200',
        width: '400',
        videoId: songId,
        playerVars: {
          autoplay: 0,
          controls: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    };
  },[])

  useEffect(()=>{
    if(playerRef.current && playerRef.current.loadVideoById){
      playerRef.current.loadVideoById(songId);
    }
  },[songId])

  const onPlayerReady = (event) => {
    socket.emit('getSongs')
    socket.on('fetchSongs',(songList)=>{
    setSongId(songList[0].Id);
    
  })
    event.target.playVideo()
  };

  // Function to run when the player's state changes
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      
      const currentVideoInfo = playerRef.current.getVideoData();
      const currentVideoId = currentVideoInfo.video_id;
      socket.emit('deleteSong',(currentVideoId))
      socket.emit('getSongs')
        socket.on('fetchSongs',(songList)=>{
        setSongId(songList[0].Id);
  })
    }
  }
    
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    
    setVolume(newVolume); // Update the volume state
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume); // Set the YouTube player volume
    }
  };

  return (
    <div>
        <div id='player' className='z-0'></div>
        <input 
        type="range" 
        min={0} 
        max="100" 
        value={volume} 
        onChange={handleVolumeChange} 
        className="range range-primary w-96 h-1" />
    </div>
  )
}
