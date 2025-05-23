const express = require('express')
const router = express.Router()
const user_handler = require("../router_handler/router_userinfo")
// "/api/my

//验证数据的中间件
const expressJoi = require("@escook/express-joi")
// const { userinfo_schemaAdd, userinfo_schemaUpdate, userinfo_password_schema } = require("../schema/user")
//获取管理员数据
router.get("/userinfo/:page/:limit", user_handler.getUserInfo)
//添加管理员数据
router.post("/add/manage", user_handler.addUserInfo)
//更新管理员数据
router.post("/update/manage", user_handler.updateUserInfo)
//更新管理员数据
router.delete("/delete/manage/:id", user_handler.deleteUserInfo)


//获取客户数据
router.post("/clientinfo/:page/:limit", user_handler.getClientInfo)
//添加客户数据
router.post("/add/client", user_handler.addClientInfo)
//更新客户数据
router.post("/update/client", user_handler.updateClientInfo)
//删除客户数据
router.delete("/delete/client/:id", user_handler.deleteClientInfo)


//重置密码
router.post("/updatepwd", user_handler.updatePassword)
//更换头像
router.post("/update/avatar", user_handler.updateAvatar)

module.exports = router