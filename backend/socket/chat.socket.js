export const chatSocket = (socket,io)=>{
    socket.on('clientMessage',(data)=>{
        /* console.log("Message Recieved =",data) */
        io.emit("serverMessage",data)
    })
}