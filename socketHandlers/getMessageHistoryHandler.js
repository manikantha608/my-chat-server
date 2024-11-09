const Conversation = require("../models/Conversation")

const chatHistoryHandler = async (socket,data) =>{
   try{
    //Conversation ID
    const {conversationId} = data;
    
    console.log(data,"conversation Id")

    //Find the conversation by Id and populate the messages

    const conversation = await Conversation.findById(conversationId).select("messages").populate("message");

    if(!conversation){
       return socket.emit("error",{message:"Conversation not found"})             
    }

    //Prepare the response data
    const res_data = {
       conversationId,
       history:conversation.messages             
    }

    //Emit the chat history back to same socket
    socket.emit("chat-history",res_data)

   }catch(error){
     //Handle any                
   }
}

module.exports = chatHistoryHandler;