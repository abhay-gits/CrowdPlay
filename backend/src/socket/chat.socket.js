export const chatSocket = (socket,io)=>{
    socket.on('clientMessage',(data)=>{
        io.emit("serverMessage",data)
    })
}