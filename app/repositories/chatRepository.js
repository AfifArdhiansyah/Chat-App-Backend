const {chats} = require('../models');

const chatRepository = {
    //get chat by conversation id
    getChatByConversationId : async (id) => {
        return await chats.findAll({
            where: {
                conversation_id: id
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });
    },

    //new chat
    createChat : async (chat) => {
        return await chats.create(chat);
    },

    //delete chat
    deleteChat : async (id) => {
        return await chats.destroy({
            where: {
                id: id
            }
        });
    }
};

module.exports = chatRepository;