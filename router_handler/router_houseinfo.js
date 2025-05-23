const db = require("../db/index")
// "/api/house
//获取酒店信息数据
exports.getHouseInfo = (req, res) => {
    const sql = "select * from ev_houseinfo  "
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

//更新酒店信息数据
exports.updateHouseInfo = (req, res) => {
    const sql = "update ev_houseinfo set ? where id=?"
    db.query(sql, [req.body, 1], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("更新信息失败")
        }
        res.send({
            code: 200,
            msg: "更新信息成功",
        })
    })
}