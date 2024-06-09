const joi = require("joi");
const authService = require('../services/authService');

const loginSchema = joi.object().keys({
    userName: joi.string().required(),
    password: joi.string().required()
})

module.exports = {
    login : async (req, res) => {
        try{
        const validate = await loginSchema.validateAsync(req.body);
        const login = await authService.login(validate);
        if(login.error){
            return res.send({
                error: login.error
            })
        }
        if (login.message) {
            return res.send({
                message: login.message
            });
        }
        return res.send({
            response: login.response
        })
        }catch(error){
            return res.send({
                error: error
            })
        }

        
    }
}