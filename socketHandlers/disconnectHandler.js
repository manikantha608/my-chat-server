const User = require("../models/User")

const disconnectHandler = async(socket)=>{
   // Log the disconnection
   console.log(`User disconnected : ${socket.id}`)

   //Update user document set socketId to undefined and status to Offline
   const user = await User.findOneAndUpdate(
       {socketId:socket.id},
       {socketId:undefined,status:"Offline"},
       {new:true,validateModifiedOnly:true}             
   );
   if(user){
      //Broadcast to everyone except the disconnected user that the user has gone offline 
      socket.broadcast.emit("user-disconnected",{
          message:`User ${user.name} has gone offline`,
          userId:user._id,
          status:"Offline"          
      })            
   }else{
      console.log(`User with ID ${socket.id} not found`)              
   }
}

module.exports = disconnectHandler;