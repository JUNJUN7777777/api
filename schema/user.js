//验证规则
const joi = require("joi")

//名and密码
const username = joi.string().alphanum().min(1).max(12).required()
// const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const password = joi.string().alphanum().min(2).max(12).required()

const user_pic = joi.string()

//id nickname email验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.schema = {
    body: {
        username, password, user_pic
    }
}

exports.userinfo_schemaAdd = {
    body: {
        username, password
    }
}

exports.userinfo_schemaUpdate = {
    body: {
        id, username
    }
}


exports.userinfo_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref("oldPwd")).concat(password)
    }
}