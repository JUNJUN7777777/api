//验证规则
const joi = require("joi")

//名and密码
const name = joi.string().required()
const alias = joi.string().alphanum().required()

const id = joi.number().integer().min(1).required()

exports.article_schema = {
    body: {
        name, alias
    }
}

exports.deletecate_schema = {
    params: {
        id
    }
}

exports.getcate_schema = {
    params: {
        id
    }
}

exports.updatecate_schema = {
    body: {
        id,
        name,
        alias
    }
}


