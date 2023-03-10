const {friends, users} = require('../models');

const friendRepository = {
    // Get all friends
    getAllFriends : async () => {
        return await friends.findAll(
            // {
            //     include: ['users']
            // }
        );
    },

    // Get friend by id
    getFriendById : async (id) => {
        return await friends.findByPk(id);
    },

    // Get one friend by userid
    getFriendByUserId : async (userid) => {
        return await users.findOne({
            include: [{
                model: users,
                as: 'friend_list',
                attributes : {
                    exclude : ['password', 'createdAt', 'updatedAt', 'friends']
                }
            }],
            where: {
                id: userid
            },
            order: [
                ['friend_list', 'username', 'ASC']
            ]
        });
    },

    // Create new friend
    createFriend : async (friend) => {
        return await friends.create(friend);
    },

    // Update friend
    updateFriend : async (id, friend) => {
        return await friends.update(friend, {where: {id}});
    },

    // Delete friend
    deleteFriend : async (id) => {
        return await friends.destroy({where: {id}});
    }
}

module.exports = friendRepository;