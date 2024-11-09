const authSocket = require("./middleware/authSocket")
const disconnectHandler = require("./socketHandlers/disconnectHandler")
const chatHistoryHandler = require("./socketHandlers/getMessageHistoryHandler")
const newConnectionHandler = require("./socketHandlers/newConnectionHandler")
const newMessageHandler = require("./socketHandlers/newMessageHandler")
const startTypingHandler = require("./socketHandlers/startTypingHandler")
const stopTypingHandler = require("./socketHandlers/stopTypingHandler")

const registerSocketServer = (server)=>{
   const io = require("socket.io")(server,{
        cors:{
          origin:"*",
          method:["GET","POST"]          
        }            
   })
   
   io.use((socket,next)=>{
     authSocket(socket,next)               
   })

   io.on("connection",(socket)=>{
      console.log("User connected")  
      console.log(socket.id)  
      
      // **DONE: newConnectionHandler
       newConnectionHandler(socket,io)

      //**DONE : disconnectHandler
      socket.on("disconnect",()=>{
         disconnectHandler(socket)
      })

      //**DONE : newMessagehandler
      socket.on("new-message",(data)=>{
        newMessageHandler(socket,data,io)
      })

      //**DONE : chatHistoryHandler
      socket.on("direct-chat-history",(data)=>{
         chatHistoryHandler(socket,data)
      })

      //**DONE : startTypingHandler
      socket.on("start-typing",(data)=>{
         startTypingHandler(socket,data,io)
      })

      //**DONE :stopTypingHandler
      socket.on("stop-typing",(data)=>{
        stopTypingHandler(socket,data,io)
      })


   })



}

module.exports = {registerSocketServer}