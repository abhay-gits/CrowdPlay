import { useEffect, useState } from 'react'
import socket from '../utils/socket';

export const ChatBox = ({ userName }) => {

    const [inputValue, setInputValue] = useState('');
    const [messagePacket, setMessagePacket] = useState([]);

    const handleSend = () => {
        if (inputValue) {
            socket.emit('clientMessage', {
                text: inputValue,
                name: userName,
            })
        }
        setInputValue('')
    }
    // Listen for incoming messages from the server
    useEffect(() => {
        const handleServer = (data) => {
            setMessagePacket(PrevMessages => [...PrevMessages, data])
        }
        socket.on('serverMessage', handleServer)
        return () => {
            socket.off('serverMessage', handleServer)
        }
    }, [socket])

    return (
        <div className='border  shadow-sm shadow-purple-200 bg-white w-96 rounded-md  h-5/6 relative'>
            <div className='text-xl font-semibold p-2 rounded-t-md bg-gray-800 text-white'>
                Chat about Musix
            </div>
            {/* Chat messages */}
            <div className='rounded-b p-2 h-[calc(100vh-15rem)] overflow-y-auto'>
                {messagePacket.map((data, index) => (
                    <div className="chat chat-start" key={index}>
                        <div className="chat-header">{data.name}</div>
                        <div className="chat-bubble bg-purple-600">{data.text}</div>
                    </div>
                ))}
            </div>
            {/* Input */}
            <div className='flex p-2 gap-1 absolute bottom-1 w-full'>
                <input
                    type="text"
                    placeholder="Type here"
                    id='input'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className=" input input-bordered input-sm w-5/6" />
                <button className="btn btn-sm bg-purple-500 text-white hover:text-purple-500" onClick={handleSend}>Send</button>
            </div>
        </div>
    )}
