import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext/index';
import axios from '../api/axios';
import { signOut } from '../firebase/auth'
import logo from '../assets/logo.svg';

interface songInfo  {
  name: string;
  artist: { name: string };
  videoId: string;
  thumbnails: [];
  duration: string;
}

interface HeaderProps {
  setSongInfo: (songInfo: songInfo ) => void; 
}

const Header: React.FC<HeaderProps> = ({ setSongInfo }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useAuth(); 

  const handleSearch = async () => {
    const response = await axios.get(`/video/info/${searchValue}`);
    console.log(response.data);
    setSongInfo(response.data);
    setSearchValue('');   
  }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    }; 

  const handleLogout = () => {
    signOut();
  }

  return (
    <header className="flex items-center justify-between gap-5  whitespace-nowrap border-b border-solid border-b-[#283039] px-2 md:px-10 py-3">
      <div className="flex items-center">
        <div className="flex items-center gap-2 md:gap-4 text-white">
          <div className='w-8'>
            <img src={logo} alt="CrowdPlay Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">CrowdPlay</h2>
        </div>
      </div>
      {/* search */}
      <div className="flex flex-1 justify-end gap-4">
        <label className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#9caaba] flex border-none bg-[#283039] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg className='hidden md:block' xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
            <input
              placeholder="Search"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] focus:border-none h-full placeholder:text-[#9caaba] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </label>
        <div className="flex gap-2">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#283039] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          onClick={handleSearch}>
            <div className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
          </button>
        </div>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer"
          style={{
            backgroundImage: `url("${currentUser?.photoURL}")`,
          }}>
            {showMenu && 
            <div className="absolute bg-red-800 top-10 p-1 left-0 rounded mt-2">
              <button className='text-white font-bold' onClick={handleLogout}>SignOut</button>
            </div>
            }
            </div>
      </div>
    </header>
  );
};

export default Header;
