const e = require('express');
const userRepository = require('../repositories/userRepository');

userService = {
    // Get all users
    getAllUsers : async () =>{
        try{
            return await userRepository.getAllUsers();
        }
        catch(err){
            throw err;
        }
    },

    // Get user by id
    getUserById : async (id) => {
        try{
            return await userRepository.getUserById(id);
        }
        catch(err){
            throw err;
        }
    },

    // Get one user by username
    getUserByUsername : async (username) => {
        try{
            return await userRepository.getUserByUsername(username);
        }
        catch(err){
            throw err;
        }
    },

    // Create new user
    createUser : async (user) => {
        try{
            return await userRepository.createUser(user);
        }
        catch(err){
            throw err;
        }
    },

    // Update user
    updateUser : async (id, user) => {
        try{
            return await userRepository.updateUser(id, user);
        }
        catch(err){
            throw err;
        }
    },

    // Delete user
    deleteUser : async (id) => {
        try{
            return await userRepository.deleteUser(id);
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = userService;