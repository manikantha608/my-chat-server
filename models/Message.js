//author
//content
//media
//audioUrl
//document
//giphyUrl
//date
//type = > Media | Text | Document | Audio | Giphy

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const documentSchema = new Schema({
     url:{type:String},
     name:{type:String},
     size:{type:String}               
})

const messageSchema = new Schema({
     author:{
        type:Schema.Types.ObjectId,
        ref:"User"            
     },
     content:{
        type:String ,
        trim:true           
     },
     media:[
        {
          type:{
            type:String,
            enum:["image","video"]        
          },
          url:{
             type:String       
          }          
        }            
     ],
     audioUrl:{
        type:String            
     },
     giphyUrl:{
        type:String            
     },
     type:{
        type:String,
        enum:["Media","Text","Document","Giphy","Audio"]
     },
     document:documentSchema               
})

const Message = new mongoose.model("Message",messageSchema)
module.exports = Message;