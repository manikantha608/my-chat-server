

const User = require("../models/User");
const Conversation = require("../models/Conversation")
const catchAsync = require("../utilities/catchAsync")
//GET me
exports.getMe = catchAsync(async(req,res,next)=>{
   const {user} = req;
   res.status(200).json({
      status:"success",
      message:"User Info found successfully!",
      data:{
        user            
      }              
   })                 
})

//Update me

exports.updateMe = catchAsync(async(req,res,next)=>{
   const {name,jobTitle,bio,country} = req.body;
   const {_id} = req.user;
   
   const updatedUser = await User.findByIdAndUpdate(_id,{
       name,jobTitle,bio,country             
   },{
      new:true,
      validateModifiedOnly:true              
   })
   res.status(200).json({
       status:"success",
       message:"Profile Info Updated Successfully!",
       data:{
          user:updatedUser          
       }             
   })
})

//Update avatar
exports.updateAvatar = catchAsync(async(req,res,next)=>{
   const {avatar} = req.body;
   const {_id} = req.user;
   
   const updatedAvatar = await User.findByIdAndUpdate(_id,{
         avatar             
   },{
      new:true,
      validateModifiedOnly:true              
   })
   res.status(200).json({
       status:"success",
       message:"Avatar Updated Successfully!",
       data:{
          user:updatedAvatar          
       }             
   })
})

//Update password
exports.updatePassword = catchAsync(async(req,res,next)=>{
   const {currentPassword,newPassword} = req.body;
   
   const {_id} = req.user;

   const user = await User.findById(_id).select("+password");

   if(!(await user.correctPassword(currentPassword,user.password))){
      return res.status(401).json({
        status:"error",
        message:"Current Password is incorrect"            
      })              
   }

   user.password = newPassword;
   user.passwordChangedAt = Date.now()

   await user.save({})

   res.status(200).json({
       status:"success",
       message:"Password Updated Successfully!"             
   })
})

//Get users
exports.getUsers = catchAsync(async(req,res,next)=>{
   const {_id} = req.user;
   
   const other_verified_users = await User.find({
       _id:{$ne:_id},
       verified:true,             
   }).select("name avatar _id status")

   res.status(200).json({
      status:"success",
      message:"User found successfully!",
      data:{
         users:other_verified_users           
      }              
   })
})

//Start conversation
exports.startConversation = catchAsync(async(req,res,next)=>{
   const {userId} = req.body;
   const {_id} = req.user;
   
   //check if a conversation between those two users already exists
   let conversation = await Conversation.findOne({
       participants:{$all:[userId,_id]}
   })
   .populate("messages")
   .populate("participants");

   if(conversation){
     return res.status(200).json({
       status:"success",
       data:{
          conversation          
       }
     })               
   }else{
      //Create a new conversation
      let newConversation = await Conversation.create({
         participants:[userId,_id]           
      }) 
      
      newConversation = await Conversation.findById(newConversation._id)
      .populate("messages")
      .populate("participants")

      return res.status(201).json({
         status:"success",
         data:{
           conversation:newConversation
         }           
      })
   }
})

//get conversations
exports.getConversations = catchAsync(async(req,res,next)=>{
    const {_id} = req.user;

    //Find all conversations where the current logged in user is a participant
    const conversations = await Conversation.find({
       participants:{$in:[_id]}             
    })
    .populate("messages")
    .populate("participants");

    //send the list of conversations as a response
    res.status(200).json({
        status:"success",
        data:{
           conversations         
        }            
    })
})