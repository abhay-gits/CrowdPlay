import React, { useState, useEffect, useRef } from "react";
import socket from "../socket/socket";
import axios from "../api/axios";
import playButton from "../assets/play.svg";
import pauseButton from "../assets/pause.svg";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface Song {
  name: string;
  artist: string;
  duration: string;
  currentTime: string;
  albumArt: string;
  Id: string;
}

const MusicPlayer: React.FC = () => {
  const playerRef = useRef<any>(null);
  const [songId, setSongId] = useState("");
  const [songInfo, setSongInfo] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDetails, setSongDetails] = useState<any>(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(tag, firstScript);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("hiddenPlayer", {
        height: "0",
        width: "0",
        videoId: songId,
        playerVars: {
          autoplay: 1,
          controls: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(songId);
    }
  }, [songId]);

  const onPlayerReady = () => {
    socket.emit("getSongs");
    socket.on("fetchSongs", (songList: Song[]) => {
      if (songList.length > 0) {
        const firstSong = songList[0];
        setSongId(songList[0].Id);
        setSongInfo(songList[0]);
        handleSearch(firstSong);
      }
    });
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      const currentVideoInfo = playerRef.current.getVideoData();
      const currentVideoId = currentVideoInfo.video_id;
      socket.emit("deleteSong", currentVideoId);
      socket.emit("getSongs");
      socket.on("fetchSongs", (songList: Song[]) => {
        if (songList.length > 0) {
          const firstSong = songList[0];
          setSongId(songList[0].Id);
          setSongInfo(songList[0]);
          handleSearch(firstSong);
        }
      });
    }
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
  };

  const handleSearch = async (firstSong: any) => {
    console.log("Searching for song:", firstSong.name);
    const response = await axios.get(`/video/info/${firstSong.name}`);
    setSongDetails(response.data);
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      {/* Hidden YouTube player */}
      <div id="hiddenPlayer" style={{ display: "none" }} />

      {/* Song strip UI */}
      <div className="bg-gray-800 text-white rounded-lg h-16 px-4 flex items-center justify-between">
        {/* Album art */}
        <div className="flex items-center gap-4">
          <img
            src={
              songDetails?.thumbnails?.[0]?.url ||
              "https://mynoota.com/_next/image?url=%2F_static%2Fimages%2F__default.png&w=640&q=75"
            }
            alt={songInfo?.name}
            className="w-12 h-12 rounded-md object-cover"
          />
          {/* Song info */}
          <div className="flex flex-col">
            <span className="font-semibold truncate max-w-[200px]">
              {songDetails?.name || "Refresh or Select a Song"}
            </span>
            <span className="text-sm text-gray-400 truncate max-w-[200px]">
              {songInfo?.artist}
            </span>
          </div>
        </div>

        {/* Play/Pause */}
        <button
          onClick={togglePlayPause}
          className="bg-green-500 hover:bg-green-600 rounded-full p-3"
        >
          {isPlaying ? 
           <img src={playButton} alt="Play" />
          :<img src={pauseButton} alt="Pause" />}
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;
