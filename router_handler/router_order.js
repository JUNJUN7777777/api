const db = require("../db/index")
// "/api/order
//获取房型数据
exports.getHouseInfo = (req, res) => {
    const sql = "select * from housetype where is_delete=0 "
    db.query(sql, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            code: 200,
            msg: "获取成功",
            data: results,
        })

    })
}

//添加房型数据
exports.addHouseInfo = (req, res) => {
    const sql = "insert into housetype set ? "

    db.query(sql, req.body, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("添加失败")
        }
        res.send({
            code: 200,
            msg: "添加成功",
            data: req.body
        })
    })
}

//更新房型数据
exports.updateHouseInfo = (req, res) => {
    const sql = "update housetype set ? where id=?"
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("更新用户失败")
        }
        res.send({
            code: 200,
            msg: "更新成功",
        })
    })
}

//删除房型数据
exports.deleteHouseInfo = (req, res) => {
    const sql = "DELETE FROM housetype WHERE id IN (?)"
    db.query(sql, [req.body], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            code: 200,
            msg: "删除成功",
        })
    })
}


// "/api/order
//后台获取订单数据
exports.getOrderInfo = (req, res) => {
    const page = req.params.page
    const limit = req.params.limit
    if (JSON.stringify(req.body) !== "{}") {
        let sqlquery = "select * from ev_order where is_delete=0 AND phone=? order by name desc limit ?,? "
        db.query(sqlquery, [req.body.phone, (parseInt(page) - 1) * parseInt(limit), parseInt(limit)], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            let sqlTotal = 'select count(*) as total from ev_order where is_delete=0 AND phone=? '
            db.query(sqlTotal, req.body.phone, (err, among) => {
                let total = among[0]['total']
                res.send({
                    code: 200,
                    data: results,
                    total: total,
                })
            })
        })
    } else {
        const sql = "select * from ev_order where is_delete=0 order by id desc limit ?,? "
        db.query(sql, [(parseInt(page) - 1) * parseInt(limit), parseInt(limit)], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            let sqlTotal = 'select count(*) as total from ev_order  where is_delete=0 '
            db.query(sqlTotal, (err, among) => {
                let total = among[0]['total']

                res.send({
                    code: 200,
                    msg: "获取成功",
                    data: results,
                    total: total,
                })

            })

        })

    }
}


//添加订单数据
exports.addOrderInfo = (req, res) => {
    const sql = "insert into ev_order set ? "
    db.query(sql, req.body, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("添加订单失败")
        }
        const sqlUp = "update housetype set surplus=surplus-1 where type=?"
        db.query(sqlUp, req.body.type, (err, results) => {
            res.send({
                code: 200,
                msg: "添加成功",
                data: req.body
            })
        })
    })
}

//更新订单数据
exports.updateOrderInfo = (req, res) => {
    const sql = "update ev_order set ? where id=?"
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("更新失败")
        }
        res.send({
            code: 200,
            msg: "更新成功",
        })
    })
}

//删除订单数据
exports.deleteOrderInfo = (req, res) => {
    const sql = "DELETE FROM ev_order WHERE id IN (?)"
    db.query(sql, [req.body], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            code: 200,
            msg: "删除成功",
        })
    })
}

//订单支付
exports.updateOrderStatus = (req, res) => {
    const sql = "update ev_order set status=0  where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("更新失败")
        }
        res.send({
            code: 200,
            msg: "更新成功",
        })
    })
}

