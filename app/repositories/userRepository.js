const {users} = require('../models');

const userRepository = {
    // Get all users
    getAllUsers : async () => {
        return await users.findAll({
            include: ['friend_list']
        });
    },

    // Get all users with chats
    getAllUsersWithChats : async () => {
        return await users.findAll({
            include: ['from_user', 'to_user']
        });
    },

    // Get user by id
    getUserById : async (id) => {
        return await users.findByPk(
            id,{
                include: ['friend_list']
            }
        );
    },

    // Get one user by username
    getUserByUsername : async (username) => {
        return await users.findOne({
            where: {
                username: username
            },
            include: ['friend_list']
        });
    },

    // Create new user
    createUser : async (user) => {
        return await users.create(user);
    },

    // Update user
    updateUser : async (id, user) => {
        return await users.update(user, {where: {id}});
    },

    // Delete user
    deleteUser : async (id) => {
        return await users.destroy({where: {id}});
    },
}

module.exports = userRepository;