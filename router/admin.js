const express = require('express')
const router = express.Router()
const user_handler = require("../router_handler/router_admin")

//验证数据的中间件
const expressJoi = require("@escook/express-joi")
const { userinfo_schemaUpdate, userinfo_password_schema } = require("../schema/user")
//获取用户数据
router.get("/info", user_handler.getUserInfo)
//更新用户数据
router.post("/info", expressJoi(userinfo_schemaUpdate), user_handler.updateUserInfo)
//重置密码
router.post("/updatepwd", expressJoi(userinfo_password_schema), user_handler.updatePassword)
//更换头像
router.post("/update/avatar", user_handler.updateAvatar)

module.exports = router