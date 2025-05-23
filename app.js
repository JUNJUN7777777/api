const express = require('express')
const app = express()

const joi = require("joi")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const cors = require("cors")
app.use(cors())

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

//封装错误的中间件函数
app.use((req, res, next) => {
    res.cc = function (err, status = 400) {
        res.send({ status, message: err instanceof Error ? err.message : err })
    }
    next()
})

//Token
const secretKEY = "itheima No1 ^_^"
const expressJWT = require("express-jwt")
app.use(expressJWT.expressjwt({ secret: secretKEY, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))

// 中间件要在路由前面
//admin登录注册
const router = require("./router/router")
app.use("/api", router)
//admin信息
const routerAdmininfo = require("./router/admin")
app.use("/admin", routerAdmininfo)
//管理员、客户
const routerUserinfo = require("./router/userinfo")
app.use("/api/my", routerUserinfo)
//房型、订单
const routerOrderinfo = require("./router/order")
app.use("/api/order", routerOrderinfo)
//酒店信息
const routerHouseinfo = require("./router/houseinfo")
app.use("/api/house", routerHouseinfo)

//错误级别的中间件
app.use((err, req, res, next) => {
    //注册表单出错
    if (err instanceof joi.ValidationError) return res.cc(err)
    //token出错
    if (err.name === "UnauthorizedError") return res.cc("身份认证失败")
    //未知错误
    res.cc(err)
})

//cheerio爬虫
const cheerio = require('cheerio');
const fs = require("fs")
const axios = require("axios")
const $ = cheerio.load('<h2 class="title">Hello world</h2>');
//爬虫的网站
var url = "https://www.stats.gov.cn/sj/sjjd/202302/t20230202_1896584.html"
axios.get(url).then(function (response) {
    try {
        // console.log(response)
        getData(response.data)
    } catch (e) {
        console.error(e.message)
    }
})
    .catch(function (error) {
        // handle error
        console.log(error)
    })

function getData(data) {
    //将获取到的html结构赋值给$
    const $ = cheerio.load(data)
    var aBox = $(".TRS_Editor .MsoNormal:eq(4)")
    // console.log(aBox.data)
    var arr = []
    aBox.each((index, item) => {
        try {
            var key = $(item).find("span").text()
            var value = key.substring(31, 37)
        } catch (error) {
            console.log(error)
        }
        arr.push({
            value,
        })
    })
    app.get("/api/cheerio", (req, res) => {
        res.send({
            code: 200,
            data: arr
        })
    })
    // fs.writeFile(__dirname + "/content.txt", JSON.stringify(arr), (err) =>
    //     console.log(err)
    // )
    // console.log(arr)
}

app.listen(595, () => {
    console.log('端口信息http://127.0.0.1')
})