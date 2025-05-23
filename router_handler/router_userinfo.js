const db = require("../db/index")
const bcrypt = require("bcryptjs")
// "/api/my
//管理员页面获取数据
exports.getUserInfo = (req, res) => {
    const page = req.params.page
    const limit = req.params.limit
    const params = [(parseInt(page) - 1) * parseInt(limit), parseInt(limit)]
    const sql = "select id,username,user_pic from ev_users where is_delete=0 limit ?,? "
    db.query(sql, params, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        let sqlTotal = 'select count(*) as total from ev_users  where is_delete=0 '
        db.query(sqlTotal, (err, among) => {
            let total = among[0]['total']
            res.send({
                code: 200,
                msg: "获取成功",
                data: results,
                total: total
            })
        })

    })
}
//管理层添加管理员
exports.addUserInfo = (req, res) => {
    const sql = "select * from ev_users where username=? "
    db.query(sql, req.body.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length == 1) {
            return res.cc("名字重复，请换一个")
        }
        const sql = "insert into ev_users set ? "
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
    })

}
//管理层更新管理员
exports.updateUserInfo = (req, res) => {
    const sql = "update ev_users set ? where id=?"
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

//删除管理员
exports.deleteUserInfo = (req, res) => {
    const sql = "update ev_users set is_delete=1 where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("删除用户失败")
        }
        res.send({
            code: 200,
            msg: "删除成功",
        })
    })
}

//获取客户信息
exports.getClientInfo = (req, res) => {
    const page = req.params.page
    const limit = req.params.limit
    if (JSON.stringify(req.body) !== "{}") {
        let sqlquery = "select * from client where is_delete=0 AND (clientName=? or phone=? or grade=?) order by grade desc limit ?,? "
        db.query(sqlquery, [req.body.clientName, req.body.phone, req.body.grade, (parseInt(page) - 1) * parseInt(limit), parseInt(limit)], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            let sqlTotal = 'select count(*) as total from client where is_delete=0 AND (clientName=? or phone=?  or grade=?) '
            db.query(sqlTotal, [req.body.clientName, req.body.phone, req.body.grade], (err, among) => {
                let total = among[0]['total']
                res.send({
                    code: 200,
                    data: results,
                    total: total,
                })
            })
        })
    } else {
        const sql = "select * from client where is_delete=0 order by id desc limit ?,? "
        db.query(sql, [(parseInt(page) - 1) * parseInt(limit), parseInt(limit)], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            let sqlTotal = 'select count(*) as total from client  where is_delete=0 '
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
//添加会员
exports.addClientInfo = (req, res) => {
    const sql = "select * from client where clientName=? "
    db.query(sql, req.body.clientName, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length == 1) {
            return res.cc("名字重复，请换一个")
        }
        const sql = "insert into client set ? "
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
    })

}
//更新会员
exports.updateClientInfo = (req, res) => {
    const sql = "update client set ? where id=? "
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

//删除会员
exports.deleteClientInfo = (req, res) => {
    const sql = "update client set is_delete=1 where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("删除用户失败")
        }
        res.send({
            code: 200,
            msg: "删除成功",
        })
    })
}



//更新密码
exports.updatePassword = (req, res) => {
    const sql = "select * from ev_users where id=?"
    db.query(sql, 1, (err, results) => {
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
        const sql = "update ev_users set password=? where id=?"
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, 1], (err, results) => {
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

//更新头像
exports.updateAvatar = (req, res) => {
    const sql = "update ev_users set user_pic=? where id=?"
    db.query(sql, [req.body.avatar, 1], (err, results) => {
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