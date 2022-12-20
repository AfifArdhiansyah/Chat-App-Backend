const userServices = require('../services/userService');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT = 10;
const {v4: uuidv4} = require('uuid');

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
  
// check password
function checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
        if (!!err) {
          reject(err);
          return;
        }
  
        resolve(isPasswordCorrect);
      });
    });
}

const authController = {
    //register
    register : async (req, res) => {
        try{
            const {username, password} = req.body;
            const findUser = await userServices.getUserByUsername(username);
            if(findUser){
                res.status(400).json({
                    status: "error",
                    message: "Username already exists",
                    data: {}
                });
            }
            const encryptedPassword = await encryptPassword(password);
            const newUser = await userServices.createUser({
                id: uuidv4(),
                username: username,
                password: encryptedPassword
            });
            res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: newUser
            });
        }
        catch(err){
            res.status(500).json({
                status: "error",
                message: err.message,
                data: {}
            });
        }
    },

    //login
    login : async (req, res) => {
        try{
            const {username, password} = req.body;
            const findUser = await userServices.getUserByUsername(username);
            if(!findUser){
                res.status(400).json({
                    status: "error",
                    message: "Username does not exist",
                    data: {}
                });
            }
            const isPasswordCorrect = await checkPassword(findUser.password, password);
            if(!isPasswordCorrect){
                res.status(400).json({
                    status: "error",
                    message: "Password is incorrect",
                    data: {}
                });
            }
            const token = jwt.sign({id: findUser.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
            res.status(200).json({
                status: "success",
                message: "User logged in successfully",
                data: {
                    token: token,
                    user: findUser
                }
            });
        }
        catch(err){
            res.status(500).json({
                status: "error",
                message: err.message,
                data: {}
            });
        }
    },
};

module.exports = authController;