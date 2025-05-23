const express = require('express')
const router = express.Router()
const router_handler = require("../router_handler/router_handler")

//验证数据的中间件
const expressJoi = require("@escook/express-joi")
const { schema } = require("../schema/user")

router.post("/register", expressJoi(schema), router_handler.regUser)

router.post("/login", expressJoi(schema), router_handler.login)

router.get("/logout", router_handler.logout)


module.exports = router