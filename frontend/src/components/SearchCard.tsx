import React from "react";
import upvote from "../assets/upvote.svg";
import socket from "../socket/socket";
import { useAuth } from "../contexts/authContext";

interface songInfo {
  name: string;
  artist: { name: string };
  videoId: string;
  thumbnails: any[]; 
  duration: string;
}

interface SearchCardProps {
  songInfo: songInfo | undefined;
}

const SearchCard: React.FC<SearchCardProps> = ({ songInfo }) => {

  const { currentUser } = useAuth();
  

  const handleUpvote = (songInfo:any) => {
    const id =  songInfo.videoId;
    const name = songInfo.name;
    const mail = currentUser?.email;
    socket.emit('upvote', {songId:id,userId:mail,songName:name})
    console.log("Upvoted song:", songInfo);
  };

  return (
    <div className="bg-[#1b2127] text-white m-4 p-4 rounded-lg shadow-md">
      {songInfo && (
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">

          <img
            src={songInfo.thumbnails[0].url}
            alt={songInfo.name}
            className="rounded-full"
            />
          <div>
            <h3>{songInfo.name}</h3>
            <p className="text-sm text-gray-400">{songInfo.artist.name}</p>
          </div>
            </div>
          <img src={upvote} alt="Upvote" className="cursor-pointer" onClick={() => handleUpvote(songInfo)} />
        </div>
      )}
    </div>
  );
};

export default SearchCard;
