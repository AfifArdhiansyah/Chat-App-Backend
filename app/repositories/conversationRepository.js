const {conversations} = require('../models');
const {Op} = require('sequelize');

const conversationRepository = {
    //get all conversation by user id
    getAllConversationByUserId : async (id) => {
        return await conversations.findAll({
            where: {
                [Op.or]: [
                    {user1: id}, {user2: id}
                ]
            },
            include: ['chats'],
            order: [
                ['updatedAt', 'ASC']
            ],
        });
    },

    //get one conversation by user id
    getOneConversationByUserId : async (id) => {
        return await conversations.findOne({
            where: {
                [Op.or]: [
                    {user1: id}, {user2: id}
                ]
            },
            include: ['chats'],
            order: [
                ['updatedAt', 'ASC']
            ],
        });
    },

    //new conversation
    createConversation : async (conversation) => {
        return await conversations.create(conversation);
    },

    //update conversation
    updateConversation : async (conversation) => {
        return await conversations.update(conversation, {
            where: {
                id: conversation.id
            }
        });
    },

    //delete conversation
    deleteConversation : async (id) => {
        return await conversations.destroy({
            where: {
                id: id
            }
        });
    },
}

module.exports = conversationRepository;
