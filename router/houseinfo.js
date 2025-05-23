const express = require('express')
const router = express.Router()
const houseinfo_handler = require("../router_handler/router_houseinfo")
// "/api/house

//获取酒店信息数据
router.get("/info", houseinfo_handler.getHouseInfo)

//更新酒店信息数据
router.post("/updateInfo", houseinfo_handler.updateHouseInfo)


module.exports = router