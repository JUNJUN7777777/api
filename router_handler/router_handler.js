const db = require("../db/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secretKEY = "itheima No1 ^_^"

exports.regUser = (req, res) => {
    const userinfo = req.body

    //用joi来验证
    if (!userinfo.username || !userinfo.password) {
        return res.cc("用户名或者密码不合法")
    }

    //查询用户名是否被占用
    const sqlStr = 'select * from ev_admin where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc("用户名被占用,请更换其他用户名")
        }
        //加密 bcryptjs
        // userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //数据库插入新数据
        const sql = "insert into ev_admin set ?"
        db.query(sql, { username: userinfo.username, password: userinfo.password, user_pic: userinfo.user_pic }, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc("注册用户失败")
            }
            //注册成功
            res.send({
                code: 200,
                msg: "注册成功",
            })

        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body
    //查询用户名是否被占用
    const sqlStr = 'select * from ev_admin where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc("登录失败")
        }
        //判断密码是否正确
        // const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // if (!compareResult) {
        //     return res.cc("登录失败")
        // }
        //token剔除密码和头像
        const user = { ...results[0], password: '' }
        const tokenStr = jwt.sign(user, secretKEY, { expiresIn: '99h' })
        res.send({
            code: 200,
            msg: "登录成功",
            token: "Bearer " + tokenStr
        })
    })
}

exports.logout = (req, res) => {
    // 删除token
    res.json({
        code: 200,
        message: '退出成功',
    });
};

//图片上传
exports.upload = (req, res) => (
    multer({
        //设置文件存储路径
        dest: "public/image",
    }).array("file", 1),
    function (req, res, next) {
        let files = req.files;
        let file = files[0];
        let fileInfo = {};
        let path = "public/image/" + Date.now().toString() + "_" + file.originalname;
        fs.renameSync("./public/image/" + file.filename, path);
        //获取文件基本信息
        fileInfo.type = file.mimetype;
        fileInfo.name = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = path;
        res.json({
            code: 200,
            msg: "OK",
            data: fileInfo,
        });
    }
);
