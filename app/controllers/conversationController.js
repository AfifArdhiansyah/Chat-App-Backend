const conversationService = require('../services/conversationService');
const {v4: uuidv4} = require('uuid');
const chatService = require('../services/chatService');

const conversationController = {
    //get conversation by user id
    getConversationByUserId : async (req, res) => {
        try{
            const conversations = await conversationService.getAllConversationByUserId(req.params.id);
            if(!conversations){
                return res.status(404).json({
                    status: 'fail',
                    message: 'No conversation found',
                    data: {}
                });
            }
            else{
                return res.status(200).json({
                    status: 'success',
                    message: 'Conversation found',
                    data: conversations
                });
            }
        }
        catch(err){
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                data: err
            });
        }
    },

    //new conversation
    createConversation : async (req, res) => {
        try{
            const {receiver, message} = req.body;
            const conversation = await conversationService.createConversation({
                user1: req.params.id,
                user2: receiver
            });
            const chat = await chatService.createChat({
                from_user_id: sender,
                to_user_id: receiver,
                text: message,
                conversation_id: conversation.id,
            });
            return res.status(201).json({
                status: 'success',
                message: 'Conversation created',
                data: conversation, chat
            });
        }
        catch(err){
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                data: err
            });
        }
    },

    //update conversation
    updateConversation : async (req, res) => {
        try{
            const receiver = req.body.receiver;
            const message = req.body.message;
            const sender = req.params.id;
            let conversation = await conversationService.getOneConversationByUserId(sender);
            if(sender == receiver){
                return res.status(400).json({
                    status: 'fail',
                    message: 'You cannot send message to yourself',
                    data: {}
                });
            }
            if(!conversation){
                conversation = await conversationService.createConversation({
                    id: uuidv4(),
                    user1: sender,
                    user2: receiver
                });
            }
            const chat = await chatService.createChat({
                id: uuidv4(),
                from_user_id: sender,
                to_user_id: receiver,
                text: message,
                conversation_id: conversation.id,
            });
            return res.status(200).json({
                status: 'success',
                message: 'Conversation updated',
                data: conversation, chat
            });
        }
        catch(err){
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                data: err
            });
        }
    },
};

module.exports = conversationController;