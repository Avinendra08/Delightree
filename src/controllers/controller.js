import contacts from "../contacts.json" assert { type: 'json' };
import Message from "../models/model.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const getAllContacts = asyncHandler(async (req, res) => {
    res.status(200).json({success:true,data:contacts});
});

// export const getContactById = asyncHandler(async(req,res)=>{
//     const contactId = parseInt(req.params.id,10);
//     const contact = contacts.find(contact=> contact.id===contactId);

//     if(contact){
//         res.status(200).json({success:true,data:contact});
//     }else{
//         res.status(400).json({success:false,message:"contact not found"});
//     }
// });

export const saveMessage = asyncHandler(async(req,res)=>{
    const contactId = parseInt(req.params.id,10);
    const {message,otp} = req.body;
    if(!otp || !message){
        return res.status(400).json({success:false,message:"message or otp missing"});
    }

    const messageObject = await Message.create({
        contactId,otp,message,
    });

    if(messageObject){
        res.status(200).json({success:true,message:"message saved"});
    }
})

export const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });

    if (messages.length === 0) {
        return res.status(404).json({ success: false, message: "No messages found" });
    }

    //console.log(messages);
    
    const messageList = messages.map(msg=>{
        //console.log("Message contactId:", msg.contactId); 
        const msgId = parseInt(msg.contactId,10);
        const contact = contacts.find(c=>c.id===msgId);
        //console.log(contact);
        
        return{
            contactname: `${contact.firstname} ${contact.lastname}`,
            time: msg.createdAt,
            otp:msg.otp,
        };
    });

    res.status(200).json({ success: true, data: messageList });
});