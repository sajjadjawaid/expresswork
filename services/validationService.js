const {hash} = require("bcryptjs");
const {v4: uuid} = require("uuid");
const validationModel = require('../models/validationModel');

module.exports = {
    deletePassword : async (body) =>{
        try {

            

            // const user = body;
            const isUser = await validationModel.getUser(false, body.userName);
            console.log("in service before is user");
            if(isUser.error || isUser.response){
                return{
                    
                    error: isUser
                }
            }
            console.log("in service after isUser");
            body.password = await hash(body.password,10);
            console.log("after hash");
            body.userID = uuid();
            console.log("uuid",body.userID);
            console.log("username", body.userName);
            const user = await validationModel.validateAndCreateModel(body);
            
            // user.password = await hash(body.password, 10);
            // delete user.password;
            
           
            // const user2 = validationModel.validateAndCreateModel(user);
            if(user.error) {
                return {
                    error: user.error
                }
            }
            return {
                response: user.response
            }


        }catch(error) {
             return{
                error: error
             }
        }
    },

    getAllUsers: async() =>{
        try{
            const users = await validationModel.getAllUsers();
            if(users.error){
                return{
                    error:"no user exists"
                }
            }
            return {
                response: users.response,
            }
        } catch(error){
            return{
                error:error
            }
        }
    }
}