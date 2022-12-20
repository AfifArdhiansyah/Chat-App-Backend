const router = require('express').Router();
const userController = require('../app/controllers/userController');
const friendController = require('../app/controllers/friendController');
const conversationController = require('../app/controllers/conversationController');
const authController = require('../app/controllers/authController');

const prefix = "/api/v1";

router.get("/", (req, res) => {
    res.send("Hello World!");
});

//auth middleware
const authMiddleware = require('../app/middleware/authMiddleware');

//auth endpoints
router.post(`${prefix}/auth/register`, authController.register);
router.post(`${prefix}/auth/login`, authController.login);

//users endpoints
router.get(`${prefix}/users`, 
    authMiddleware.verifyToken,
    userController.getAllUsers
);
router.get(`${prefix}/users/:id`, userController.getUserById);
router.get(`${prefix}/users/user/:username`, userController.getUserByUsername)
router.post(`${prefix}/users`, userController.createUser);
router.put(`${prefix}/users/:id`, userController.updateUser);
router.delete(`${prefix}/users/:id`, userController.deleteUser);

//friends endpoints
router.get(`${prefix}/friends`, friendController.getAllFriends);
router.get(`${prefix}/friends/:id`, friendController.getFriendById);
router.get(`${prefix}/friends/user/:userid`, friendController.getFriendByUserId);
router.post(`${prefix}/friends`, friendController.createFriend);
router.put(`${prefix}/friends/:id`, friendController.updateFriend);
router.delete(`${prefix}/friends/:id`, friendController.deleteFriend);

//conversations endpoints
router.get(`${prefix}/conversations/user/:id`, conversationController.getConversationByUserId);
router.put(`${prefix}/conversations/user/:id`, conversationController.updateConversation);

module.exports = router;