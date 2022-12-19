const userService = require("../services/userService");
const {v4: uuidv4} = require('uuid');
const bcrypt = require("bcrypt");
const SALT = 10;

// ecrypt password
function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(encryptedPassword);
    });
  });
}

const userController = {
    // Get all users
    getAllUsers : async (req, res) => {
        try{
            const users = await userService.getAllUsers();
            if(users.length > 0){
                res.status(200).send({
                    status: "success",
                    message: "Users retrieved successfully.",
                    data: users
                });
            }
            else{
                res.status(404).send({
                    status: "fail",
                    message: "No users found.",
                    data: {}
                });
            }
        }
        catch(err){
            res.status(500).send({
                status: "fail",
                message: err.message || "Some error occurred while retrieving users.",
                data: {}
            });
        }
    },

    //Get User by Id
    getUserById : async (req, res) => {
        try{
            const id = req.params.id;
            const user = await userService.getUserById(id);
            if(user){
                res.status(200).send({
                    status: "success",
                    message: "User retrieved successfully.",
                    data: user
                });
            }
            else{
                res.status(404).send({
                    status: "fail",
                    message: `User with id ${id} not found.`,
                    data: {}
                });
            }
        }
        catch(err){
            res.status(500).send({
                status: "fail",
                message: err.message || `Some error occurred while retrieving user with id ${id}.`,
                data: {}
            });
        }
    },

    // Get one user by username
    getUserByUsername : async (req, res) => {
        try{
            const username = req.params.username;
            const user = await userService.getUserByUsername(username);
            if(user){
                res.status(200).send({
                    status: "success",
                    message: "User retrieved successfully.",
                    data: user
                });
            }
            else{
                res.status(404).send({
                    status: "fail",
                    message: `User with username ${username} not found.`,
                    data: {}
                });
            }
        }
        catch(err){
            res.status(500).send({
                status: "fail",
                message: err.message || `Some error occurred while retrieving user with username ${username}.`,
                data: {}
            });
        }
    },

    // Create new user
    createUser : async (req, res) => {
        try{
            const {username, password} = req.body;
            //if username already exists
            const user = await userService.getUserByUsername(username);
            if(user){
                return res.status(400).send({
                    status: "fail",
                    message: `User with username ${username} already exists.`,
                    data: {}
                });
            }
            const encryptedPassword = await encryptPassword(password);
            const id = uuidv4();
            const newUser = await userService.createUser({
                id: id,
                username: username,
                password: encryptedPassword
            });
            res.status(201).send({
                status: "success",
                message: "User created successfully.",
                data: newUser
            });
        }
        catch(err){
            res.status(500).send({
                status: "fail",
                message: err.message || "Some error occurred while creating the user.",
                data: {}
            });
        }
    },

    // Update user
    updateUser : async (req, res) => {
        try{
            const id = req.params.id;
            const {username, password} = req.body;
            if(password){
                password = await encryptPassword(password);
            }
            const user = await userService.updateUser(id, {
                username: username,
                password: password
            });
            if(user == 1){
                res.status(200).send({
                    status: "success",
                    message: "User updated successfully.",
                    data: user
                });
            }
            else{
                res.status(404).send({
                    status: "fail",
                    message: `User with id ${id} not found.`,
                    data: {}
                });
            }
        }
        catch(err){
            res.status(500).send({
                status: "fail",
                message: err.message || `Some error occurred while updating user with id ${id}.`,
                data: {}
            });
        }
    },

    // Delete user
    deleteUser : async (req, res) => {
        try{
            const id = req.params.id;
            const user = await userService.deleteUser(id);
            if(user == 1){
                res.status(200).send({
                    status: "success",
                    message: "User deleted successfully.",
                    data: user
                });
            }
            else{
                res.status(404).send({
                    status: "fail",
                    message: `User with id ${id} not found.`,
                    data: {}
                });
            }
        }
        catch(err){
            res.status(500).send({
                status: "fail",
                message: err.message || `Some error occurred while deleting user with id ${id}.`,
                data: {}
            });
        }
    }
}

module.exports = userController;