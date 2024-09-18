import React, { useEffect, useState } from 'react'
import socket from '../utils/socket';

export const ChatBox = ({userName}) => {
    const [inputValue, setInputValue] = useState('');
    const [messagePacket, setMessagePacket] = useState([]);
    const handleSend = () => {
        socket.emit('clientMessage',{
            text: inputValue,
            name: userName,
        })
        setInputValue('')
    }
    useEffect(() => {
       const handleServer= (data)=>{
        setMessagePacket(PrevMessages => [...PrevMessages,data])
       }
       socket.on('serverMessage',handleServer)
       return ()=>{
        socket.off('serverMessage',handleServer)
       }
    }, [socket])
    return (
        <div className='border w-96 rounded-md p-2 h-[80%]'>
            <div className='text-center bg-red-50 p-2 rounded'>
                Chat about Musix
            </div>
            {/* Main Area */}
            <div className='bg-slate-400 rounded-b min-h-96'>
                
                { messagePacket.map((data,index)=>(
                    <div className="chat chat-start" key={index}>
                        <div className="chat-header">
                            {data.name}
                        </div>
                        <div className="chat-bubble">{data.text}</div>
                    </div>
                ))}
                
            </div>
            {/* Input */}
            <div className='flex mt-2'>
                <input
                    type="text"
                    placeholder="Type here"
                    id='input'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className=" input input-bordered input-sm w-full max-w-xs" />
                <button className="btn btn-sm ml-1" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
