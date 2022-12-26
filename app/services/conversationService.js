const conversationRepository = require('../repositories/conversationRepository');

const conversationService = {
    //get all conversation by user id
    getAllConversationByUserId : async (id) => {
        try{
            return await conversationRepository.getAllConversationByUserId(id);
        }
        catch(err){
            throw err;
        }
    },

    //get one conversation by user id
    getOneConversationByUserId : async (sender, receiver) => {
        try{
            return await conversationRepository.getOneConversationByUserId(sender, receiver);
        }
        catch(err){
            throw err;
        }
    },

    //get conversation by id
    getConversationById : async (id) => {
        try{
            return await conversationRepository.getConversationById(id);
        }
        catch(err){
            throw err;
        }
    },

    //new conversation
    createConversation : async (conversation) => {
        try{
            return await conversationRepository.createConversation(conversation);
        }
        catch(err){
            throw err;
        }
    },

    //update conversation
    updateConversation : async (conversation) => {
        try{
            return await conversationRepository.updateConversation(conversation);
        }
        catch(err){
            throw err;
        }
    },

    //delete conversation
    deleteConversation : async (id) => {
        try{
            return await conversationRepository.deleteConversation(id);
        }
        catch(err){
            throw err;
        }
    }
};

module.exports = conversationService;