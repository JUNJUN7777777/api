const express = require('express')
const router = express.Router()
const order_handler = require("../router_handler/router_order")
// "/api/order

//获取房型数据
router.get("/houseinfo", order_handler.getHouseInfo)
// //添加房型
router.post("/addhouse", order_handler.addHouseInfo)
//更新房型
router.post("/updatehouse", order_handler.updateHouseInfo)
//删除房型
router.delete("/deletehouse", order_handler.deleteHouseInfo)

//获取订单数据
router.post("/orderinfo/:page/:limit", order_handler.getOrderInfo)
// //添加订单
router.post("/addorder", order_handler.addOrderInfo)
//更新订单
router.post("/updateorder", order_handler.updateOrderInfo)
//删除订单
router.delete("/deleteorder", order_handler.deleteOrderInfo)
//支付订单
router.post("/updatestatus/:id", order_handler.updateOrderStatus)

module.exports = router