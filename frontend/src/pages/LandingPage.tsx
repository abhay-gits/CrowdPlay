import React, { useEffect } from 'react';
import { signInWithGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/authContext/index.tsx';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const LandingPage: React.FC = () => {

const { userLoggedIn, loading } = useAuth();
const [isSigningIn, setIsSigningIn] = React.useState(false);
const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn && !loading) {
      navigate('/dashboard');
      console.log('User is already signed in');
    }
  }, [userLoggedIn, loading]);

  async function handleSignIn() {
    if (isSigningIn || userLoggedIn) return;
    
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      // Navigation will be handled by the useEffect above
    } catch (error) {
      console.error("Sign-in failed:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSigningIn(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  // If user is already signed in, you might want to show different content
  if (userLoggedIn) {

  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden font-['Spline_Sans','Noto_Sans',sans-serif]">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] px-4 sm:px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div>
              <img src={logo} alt="CrowdPlay Logo"/>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">CrowdPlay</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4 sm:gap-8">
            <div className="hidden sm:flex items-center gap-9">
              <a className="text-white text-sm font-medium leading-normal " href="#howitworks">
                How it works
              </a>
              <a className="text-white text-sm font-medium leading-normal" href="#">
                Pricing
              </a>
              <a className="text-white text-sm font-medium leading-normal" href="#">
                Contact
              </a>
            </div>
            <button className="flex min-w-[60px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-2 bg-[#3d98f4] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={handleSignIn}>
              <span className="truncate">Get Started</span>
            </button>
          </div>
        </header>

        <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Hero Section */}
            <div className="p-0 sm:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat sm:gap-8 rounded-xl items-center justify-center p-4"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7l9dzlN8E_yXTIVByv88M88xSs7wskIbtXyH0Log_1X38j4obuMNWWWnvR2Wgs9zDmKZd8-j8-cIL-VarKoEHba1L30CLGLGd-sAUxXsgfmkSvTPxFal5OiBffjf20lN_8-hZU8uDE6Ll_p6dwHitlZkjTTDBkGzIbAI2qHfEDoHHyKPkv8nXyK-gBewHwAFOybZZ0RNEPK2zE-JwDWfWpLczQ3fQDeHsuMi9piUDzzzylnqNxpDw6bqX2dzT6GVMZlPV4iwnydAD")`
                }}
              >
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                    Vote for your favorite songs
                  </h1>
                  <h2 className="text-white text-sm sm:text-base font-normal leading-normal">
                    CrowdPlay is a music voting application where users select songs, vote for their favorites, and the song with the most votes plays. Join the community and shape
                    the soundtrack of your day!
                  </h2>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 sm:h-12 sm:px-5 bg-[#3d98f4] text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em]"
                  onClick={handleSignIn}>
                  <span className="truncate">Get Started</span>
                </button>
              </div>
            </div>

            {/* How It Works Section */}
            <h2 id='howitworks' className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              How it works
            </h2>
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-white tracking-light text-2xl sm:text-[32px] md:text-4xl font-bold leading-tight md:font-black md:leading-tight md:tracking-[-0.033em] max-w-[720px]">
                  Simple steps to enjoy music together
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                  CrowdPlay makes it easy to create a shared music experience. Here's how you can get started:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-0">
                {/* Select Songs Card */}
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3b4754] bg-[#1b2127] p-4 flex-col">
                  <div className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M210.3,56.34l-80-24A8,8,0,0,0,120,40V148.26A48,48,0,1,0,136,184V98.75l69.7,20.91A8,8,0,0,0,216,112V64A8,8,0,0,0,210.3,56.34ZM88,216a32,32,0,1,1,32-32A32,32,0,0,1,88,216ZM200,101.25l-64-19.2V50.75L200,70Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">Select Songs</h2>
                    <p className="text-[#9cabba] text-sm font-normal leading-normal">Choose your favorite tracks from a vast library of music.</p>
                  </div>
                </div>

                {/* Vote for Favorites Card */}
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3b4754] bg-[#1b2127] p-4 flex-col">
                  <div className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">Vote for Favorites</h2>
                    <p className="text-[#9cabba] text-sm font-normal leading-normal">Cast your vote for the songs you want to hear next.</p>
                  </div>
                </div>

                {/* Listen Together Card */}
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3b4754] bg-[#1b2127] p-4 flex-col sm:col-span-2 lg:col-span-1">
                  <div className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">Listen Together</h2>
                    <p className="text-[#9cabba] text-sm font-normal leading-normal">The song with the most votes plays, creating a dynamic playlist.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Join Conversation Section */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Join the conversation
            </h2>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Connect with other music lovers and share your thoughts on the current playlist. Engage in real-time discussions and discover new music together.
            </p>
            <div className="flex px-4 py-3 justify-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#3d98f4] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate" onClick={handleSignIn}>Join the Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
