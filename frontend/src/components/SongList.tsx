import React, { useCallback, useState} from 'react';
import { useEffect } from 'react';
import socket from '../socket/socket';
import { useAuth } from '../contexts/authContext';

const SongList: React.FC = () => {
  const { currentUser } = useAuth();
  const [songList, setSongList] = useState<any[] | null>([]);

  const handleTopSongs = useCallback((songList: any) => {
    setSongList(songList);
  }, []);

  useEffect(() => {
    socket.emit('initialFetch')
    socket.on('updateTopSongs', handleTopSongs)
    return () => {
      socket.off('updateTopSongs', handleTopSongs)
    }
  }, [])

  const handleUpvote = (id: number, name: string) => {
    id;
    name;
    const mail = currentUser?.email;
    socket.emit('upvote', {songId:id,userId:mail,songName:name})
  };

  return (
    <div className='flex flex-col max-h-[60vh] min-h-[60vh]'>
      {songList && songList.length > 0 ? (
        <div className="px-4 py-3 min-h-[70vh] border border-[#3b4754]  bg-[#111418] rounded-xl">
          <div className="overflow-hidden rounded-xl border border-[#3b4754] bg-[#111418]">
            <table className="flex-1">
              <thead>
                <tr className="bg-[#1b2127]">
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Song
                </th>
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Artist
                </th>
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Votes
                </th>
                <th className="px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {songList?.map((song) => (
                <tr key={song.id} className="border-t border-t-[#3b4754]">
                  <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                    {song.name}
                  </td>
                  <td className="h-[72px] px-4 py-2 w-[400px] text-[#9caaba] text-sm font-normal leading-normal">
                    artist
                  </td>
                  <td className="h-[72px] px-4 py-2 w-[400px] text-[#9caaba] text-sm font-normal leading-normal">
                    {song.score}
                  </td>
                  <td className="h-[72px] px-4 py-2 w-60">
                    <button
                      onClick={() => handleUpvote(song.Id, song.name)}
                      className="text-[#9caaba] hover:text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
                    >
                      Upvote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>) : (
        <div className="px-4 py-3 border border-[#3b4754] bg-[#111418] rounded-xl">
          <p className="text-white">No songs available, Please add some songs by searching and upvoting them.</p>
        </div>
      )}
    </div>
  );
};

export default SongList;
