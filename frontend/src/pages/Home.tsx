import React from "react";
import Header from "../components/Header";
import MusicPlayer from "../components/MusicPlayer";
import SongList from "../components/SongList";
import Chat from "../components/Chat";
import SearchCard from "../components/SearchCard";

interface songInfo {
  name: string;
  artist: { name: string };
  videoId: string;
  thumbnails: [];
  duration: string;
}

const Dashboard: React.FC = () => {
  const [songInfo, setSongInfo] = React.useState<songInfo | undefined>();

 return (
  <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden font-['Spline_Sans','Noto_Sans',sans-serif]">
    <div className="layout-container flex h-full grow flex-col">
      <Header setSongInfo={setSongInfo} />
      
      {/* Main content area with responsive layout */}
      <div className="gap-4 px-3 sm:px-6 flex flex-1 flex-col lg:flex-row justify-center py-5">
        
        {/* Left column - Music Player and Search Card */}
        <div className="flex flex-col w-full lg:max-w-[920px] lg:flex-1 order-2 lg:order-1">
                  {songInfo && <SearchCard songInfo={songInfo} />}
        <SongList />
        </div>
        
        {/* Right column - Chat (sidebar on desktop, top on mobile) */}
        <div className="w-full lg:w-[360px] lg:min-w-[360px] order-1 lg:order-2 mb-4 lg:mb-0">
          <Chat />
        </div>
      </div>
      
      {/* Song List - Full width at bottom */}
      <div className="px-3 sm:px-6 mb-2">
        <MusicPlayer />
      </div>
    </div>
  </div>
);

};

export default Dashboard;
