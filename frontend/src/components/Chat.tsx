import React, { useEffect, useState } from 'react';
import socket from '../socket/socket';
import { useAuth } from '../contexts/authContext';

  interface ChatMessage {
    id: string;
    text: string;
    name: string;
    avatar: string;
    // Add more fields if needed (e.g., avatar, isCurrentUser)
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
    <div className="layout-content-container flex flex-col w-[360px] h-[450px] bg-gray-800 rounded-xl shadow-lg overflow-hidden">
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
                  className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#3490f3] text-white text-sm font-medium leading-normal block"
                >
                  <span className="truncate">Send</span>
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
