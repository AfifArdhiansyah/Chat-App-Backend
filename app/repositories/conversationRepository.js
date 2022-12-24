const {conversations} = require('../models');
const {Op} = require('sequelize');
const {chats, users} = require('../models');

const conversationRepository = {
    //get all conversation by user id
    getAllConversationByUserId : async (id) => {
        return await conversations.findAll({
            where: {
                [Op.or]: [
                    {user1: id}, {user2: id}
                ]
            },
            include: [{
                model : users,
                as: 'user1_conversation',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            },{
                model : users,
                as: 'user2_conversation',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            },{
                model : chats,
                attributes: {
                    exclude: ['id','updatedAt', 'conversation_id']
                },
                order: [
                    ['createdAt', 'ASC']
                ]
            }],
            order: [
                ['updatedAt', 'ASC']
            ],
        });
    },

    //get one conversation by user id
    getOneConversationByUserId : async (sender, receiver) => {
        return await conversations.findOne({
            where: {
                [Op.or]: [
                    {user1: sender, user2: receiver}, {user1: receiver, user2: sender}
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
