const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
const OTPTemplate = require("../Template/OTP")

dotenv.config("./../config.env")

const NODEMAILER_USER = "manilaveti321@gmail.com";
const NODEMAILER_APP_PASSWORD = "lbfmnomexllvmklu";
console.log(NODEMAILER_USER,NODEMAILER_APP_PASSWORD)
//Create a transport using your email service
const transporter = nodemailer.createTransport({
    host:"smtp.google.com" ,
    port:465,
    secure:true,
    service:"gmail",
    auth:{
        user: NODEMAILER_USER,
        pass: NODEMAILER_APP_PASSWORD,            
    }               
})

const Mailer = async({name,otp,email})=>{
    const mailOptions = {
        to:email, //Resipient Email
        subject:"Verify your Account",
        html:OTPTemplate({name,otp})

    }

    try{
       const info = await transporter.sendMail(mailOptions)
       console.log("Email send:%s",info.messageId)
    }catch(error){
        console.log("Error sending email:",error)
        throw new Error("Error sending email")
    }
    
}

module.exports = Mailer;