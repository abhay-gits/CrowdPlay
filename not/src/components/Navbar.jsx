import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import profile from '../assets/react.svg'
import axios from 'axios';

export const Navbar = ({ setUser, userImage, userName, setVideoInfo }) => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/logout', { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <div className="bg-white text-primary-content">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-black">Musix</h1>
      </div>
      <div className="flex-none gap-5">
        <SearchBar setVideoInfo={setVideoInfo} />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-2 border-black">
              {userImage ? (<img src={userImage} />) : (<img src={profile} />)}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>{userName}</li>
            <li className='mt-4 bg-gray-100 rounded'><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
