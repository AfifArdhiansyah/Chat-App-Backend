const friendRepository = require('../repositories/friendRepository');

const friendService = {
    // Get all friends
    getAllFriends : async () => {
        try{
            return await friendRepository.getAllFriends();
        }
        catch(err){
            throw err;
        }
    },

    // Get friend by id
    getFriendById : async (id) => {
        try{
            return await friendRepository.getFriendById(id);
        }
        catch(err){
            throw err;
        }
    },

    // Get one friend by userid
    getFriendByUserId : async (userid) => {
        try{
            return await friendRepository.getFriendByUserId(userid);
        }
        catch(err){
            throw err;
        }
    },

    // Create new friend
    createFriend : async (friend) => {
        try{
            await friendRepository.createFriend(friend);
        }
        catch(err){
            throw err;
        }
    },

    // Update friend
    updateFriend : async (id, friend) => {
        try{
            return await friendRepository.updateFriend(id, friend);
        }
        catch(err){
            throw err;
        }
    },

    // Delete friend
    deleteFriend : async (id) => {
        try{
            return await friendRepository.deleteFriend(id);
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = friendService;