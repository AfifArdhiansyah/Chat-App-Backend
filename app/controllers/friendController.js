const friendService = require('../services/friendService');
const {v4: uuidv4} = require('uuid');

const friendController = {
    // Get all friends
    getAllFriends : async (req, res) => {
        try{
            const friends = await friendService.getAllFriends();
            if(friends.length === 0){
                return res.status(404).json({
                    status : 'fail',
                    message : 'No friends found',
                    data : {}
                });
            }
            else{
                res.status(200).json({
                    status : 'success',
                    message : 'All friends found',
                    data : friends
                });
            }
        }
        catch(err){
            res.status(500).json({
                status : 'fail',
                message : err.message,
                data : {}
            });
        }
    },

    // Get friend by id
    getFriendById : async (req, res) => {
        try{
            const friend = await friendService.getFriendById(req.params.id);
            if(friend === null){
                return res.status(404).json({
                    status : 'fail',
                    message : 'No friend found',
                    data : {}
                });
            }
            else{
                res.status(200).json({
                    status : 'success',
                    message : 'Friend found',
                    data : friend
                });
            }
        }
        catch(err){
            res.status(500).json({
                status : 'fail',
                message : err.message,
                data : {}
            });
        }
    },

    // Get one friend by userid
    getFriendByUserId : async (req, res) => {
        try{
            const friend = await friendService.getFriendByUserId(req.params.userid);
            if(friend === null){
                return res.status(404).json({
                    status : 'fail',
                    message : 'No friend found',
                    data : {}
                });
            }
            else{
                res.status(200).json({
                    status : 'success',
                    message : 'Friend found',
                    data : friend
                });
            }
        }
        catch(err){
            res.status(500).json({
                status : 'fail',
                message : err.message,
                data : {}
            });
        }
    },

    // Create new friend
    createFriend : async (req, res) => {
        try{
            const id = uuidv4();
            const {user_id, friend_id} = req.body;
            if(user_id == friend_id){
                return res.status(400).json({
                    status : 'fail',
                    message : 'User cannot be friend with himself',
                    data : {}
                });
            }
            let friend = await friendService.createFriend({
                id: id,
                user_id: user_id,
                friend_id: friend_id
            });
            res.status(201).json({
                status : 'success',
                message : 'Friend created',
                data : friend
            });
        }
        catch(err){
            res.status(500).json({
                status : 'fail',
                message : err.message,
                data : {}
            });
        }
    },

    // Update friend
    updateFriend : async (req, res) => {
        try{
            const friend = await friendService.updateFriend(req.params.id, req.body);
            if(friend == 0){
                return res.status(404).json({
                    status : 'fail',
                    message : 'No friend found',
                    data : {}
                });
            }
            else{
                res.status(200).json({
                    status : 'success',
                    message : 'Friend updated',
                    data : friend
                });
            }
        }
        catch(err){
            res.status(500).json({
                status : 'fail',
                message : err.message,
                data : {}
            });
        }
    },

    // Delete friend
    deleteFriend : async (req, res) => {
        try{
            const friend = await friendService.deleteFriend(req.params.id);
            if(friend == 0){
                return res.status(404).json({
                    status : 'fail',
                    message : 'No friend found',
                    data : {}
                });
            }
            else{
                res.status(200).json({
                    status : 'success',
                    message : 'Friend deleted',
                    data : friend
                });
            }
        }
        catch(err){
            res.status(500).json({
                status : 'fail',
                message : err.message,
                data : {}
            });
        }
    }
}

module.exports = friendController;