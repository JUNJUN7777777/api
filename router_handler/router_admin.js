const db = require("../db/index")
const bcrypt = require("bcryptjs")
// /api
//获取admin信息
exports.getUserInfo = (req, res) => {
    const sql = "select id,username,user_pic from ev_admin where id=?"
    db.query(sql, req.auth.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc("获取用户信息失败")
        }
        res.send({
            code: 200,
            msg: "获取成功",
            data: results[0]
        })
    })
}

//更新admin信息
exports.updateUserInfo = (req, res) => {
    const sql = "update ev_admin set ? where id=?"
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

//更新admin密码
exports.updatePassword = (req, res) => {
    const sql = "select * from ev_admin where id=?"
    db.query(sql, req.auth.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc("用户不存在")
        }
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) {
            return res.cc("密码不相同")
        }
        const sql = "update ev_admin set password=? where id=?"
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.auth.id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc("更新密码失败")
            }
            res.send({
                code: 200,
                msg: "更新密码成功",
            })
        })

    })
}

//更新admin头像
exports.updateAvatar = (req, res) => {
    const sql = "update ev_admin set user_pic=? where id=?"
    db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("更新头像失败")
        }
        res.send({
            code: 200,
            msg: "更新头像成功",
        })
    })
}