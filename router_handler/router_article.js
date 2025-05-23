const db = require("../db/index")
// "/api/my/article
exports.getArtCates = (req, res) => {
    const sql = "select * from ev_article where is_delete=0 order by id asc"
    db.query(sql, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            code: 200,
            msg: "获取成功",
            data: results
        })
    })
}

exports.addArtCates = (req, res) => {
    const sql = "select * from ev_article where name=? or alias=?"
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 2) {
            return res.cc("分类名称和别名被占用")
        }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc("分类名称和别名被占用")
        }
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc("分类名称被占用")
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc("分类别名被占用")
        }
        const sql = "insert into ev_article set ?"
        db.query(sql, req.body, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc("新增文章分类失败")
            }
            res.send({
                code: 200,
                msg: "新增文章成功",
                data: results
            })
        })
    })
}

exports.deleteCateId = (req, res) => {
    const sql = "update ev_article set is_delete=1 where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc("删除文章失败")
        }
        res.send({
            code: 200,
            msg: "删除文章成功",
        })
    })
}

exports.getArtCateId = (req, res) => {
    const sql = "select * from ev_article where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc("获取文章失败")
        }
        res.send({
            code: 200,
            msg: "获取文章成功",
            data: results
        })
    })
}

exports.updateCateId = (req, res) => {
    const sql = "select * from ev_article where id!=? and (name=? or alias=?)"
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 2) {
            return res.cc("分类名称和别名被占用")
        }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc("分类名称和别名被占用")
        }
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc("分类名称被占用")
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc("分类别名被占用")
        }
        const sql = "update ev_article set? where id=?"
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc("更新文章分类失败")
            }
            res.send({
                code: 200,
                msg: "更新文章分类成功",
            })
        })
    })
}