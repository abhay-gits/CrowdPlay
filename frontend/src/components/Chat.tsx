import React, { useEffect, useState } from 'react';
import socket from '../socket/socket';
import { useAuth } from '../contexts/authContext';

  interface ChatMessage {
    id: string;
    text: string;
    name: string;
    avatar: string;
  }


const Chat: React.FC = () => {
  const { currentUser } = useAuth();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  useEffect(() => {
    setAvatar(currentUser?.photoURL || null);
  }, [currentUser]);

  useEffect(() => {
    const handleServer = (data: any) => {
      setMessages(PrevMessages => [...PrevMessages, data])
    }
    socket.on('serverMessage', handleServer)
    return () => {
      socket.off('serverMessage', handleServer)
    }
  }, [socket])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }; 

  const handleSendMessage = () => {
    if (inputValue) {
      socket.emit('clientMessage', {
        text: inputValue,
        name: currentUser?.displayName,
        avatar: currentUser?.photoURL,
        id: currentUser?.uid
      })
    }
    setInputValue('')
  }



  return (
    <div className="layout-content-container flex flex-col w-[360px] h-[70vh] bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-2">
        Chat
      </h2>
      <hr className='border-gray-600'/>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: 'thin', 
          scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent' 
        }}>
        {messages.map((msg) => {
          const isCurrentUser = msg.id === currentUser?.uid;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 p-2 ${
                isCurrentUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Avatar for other users (left side) */}
              {!isCurrentUser && (
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                  style={{ backgroundImage: `url("${msg.avatar}")` }}
                />
              )}
              
              <div className={`flex flex-1 flex-col gap-1 ${
                isCurrentUser ? 'items-end' : 'items-start'
              } max-w-[280px]`}>
                <p className={`text-[#9caaba] text-[13px] font-normal leading-normal`}>
                  {isCurrentUser ? 'You' : msg.name}
                </p>
                <p className={`text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-1 text-white ${
                  isCurrentUser 
                    ? 'bg-green-500 rounded-br-none' 
                    : 'bg-[#3490f3] rounded-bl-none'
                }`}>
                  {msg.text}
                </p>
              </div>

              {/* Avatar for current user (right side) */}
              {isCurrentUser && (
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                  style={{ backgroundImage: `url("${msg.avatar}")` }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="flex items-center px-4 py-3 gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
          style={{
            backgroundImage: `url("${avatar}")`
          }}
        />
        <label className="flex flex-col min-w-40 h-12 flex-1">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <input
              placeholder="Type your message..."
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] focus:border-none h-full placeholder:text-[#9caaba] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="flex border-none bg-[#283039] items-center justify-center pr-4 rounded-r-xl border-l-0 !pr-2">
              <div className="flex items-center gap-4 justify-end">
                <div className="flex items-center gap-1">
                </div>
                <button
                  onClick={handleSendMessage}
                  className="cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#3490f3] text-white text-sm font-medium leading-normal block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M9.49811 15L16.9981 7.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.00634 7.67888L15.327 4.21881C18.3688 2.78111 19.8897 2.06226 20.8598 2.78341C21.8299 3.50455 21.5527 5.14799 20.9984 8.43486L20.0435 14.0968C19.6811 16.246 19.4998 17.3205 18.6989 17.7891C17.8979 18.2577 16.8574 17.8978 14.7765 17.178L8.41077 14.9762C4.51917 13.6301 2.57337 12.9571 2.50019 11.6365C2.427 10.3159 4.28678 9.43692 8.00634 7.67888Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.49811 15.5V17.7274C9.49811 20.101 9.49811 21.2878 10.2083 21.4771C10.9185 21.6663 11.6664 20.6789 13.1622 18.7039L13.9981 17.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
                </button>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Chat;
