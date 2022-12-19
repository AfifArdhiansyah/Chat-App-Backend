const chatRepository = require('../repositories/chatRepository');

const chatService = {
    //create new chat
    createChat : async (chat) => {
        try{
            return await chatRepository.createChat(chat);
        }
        catch(err){
            throw err;
        }
    }
};

module.exports = chatService;