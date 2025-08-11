import { useEffect, useState } from 'react';
import socket from '../utils/socket';
import album from '/Designer.svg';

export const TopSongs = ({ userId }) => {

  const [songName, setSongName] = useState([]);

  useEffect(() => {
    socket.emit('initialFetch')
    const handleTopSongs = (songList) => {
      setSongName(songList)
    }
    socket.on('updateTopSongs', handleTopSongs)
    return () => {
      socket.off('updateTopSongs', handleTopSongs)
    }
  }, [])

  const handleLike = (id, name) => {
    id;
    name;
    const mail = userId;
    socket.emit('upvote', { id, name, mail })
  };

  return (
    <div className='bg-white h-5/6 w-80 border overflow-y-auto rounded-3xl p-4'>
      <h1 className='mb-3'>Most Voted</h1>
      <div className="overflow-y-hidden">
        <table className="table">
          <tbody>
            {
              songName?.map((song, index) => (
                <tr key={index} onClick={() => { handleLike(song.Id, song.name) }}>
                  <td>
                    <div className="flex items-center">
                      <div className="avatar">
                        <div className=" h-8 w-8 rounded-full">
                          <img src={album} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='text-xs font-semibold'>
                    {song.name}
                  </td>
                  <td>{song.score}</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
