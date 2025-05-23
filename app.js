const express = require('express')
const app = express()
const PORT = process.env.PORT || 595

// 中间件和依赖
const joi = require("joi")
const cors = require("cors")
const expressJWT = require("express-jwt")
const secretKEY = "itheima No1 ^_^"
const cheerio = require('cheerio');
const axios = require("axios")

// 中间件设置
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// 错误处理中间件
app.use((req, res, next) => {
    res.cc = function (err, status = 400) {
        res.send({ status, message: err instanceof Error ? err.message : err })
    }
    next()
})

// JWT认证中间件
app.use(expressJWT.expressjwt({ secret: secretKEY, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))

// 路由
app.use("/api", require("./router/router"))
app.use("/admin", require("./router/admin"))
app.use("/api/my", require("./router/userinfo"))
app.use("/api/order", require("./router/order"))
app.use("/api/house", require("./router/houseinfo"))

// 错误处理
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === "UnauthorizedError") return res.cc("身份认证失败")
    res.cc(err)
})

// 爬虫数据 - 初始化为空数组
let crawlData = []

// 爬虫函数 - 改为异步函数
async function fetchData() {
    try {
        const url = "https://www.stats.gov.cn/sj/sjjd/202302/t20230202_1896584.html"
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const aBox = $(".TRS_Editor .MsoNormal:eq(4)")

        crawlData = []
        aBox.each((index, item) => {
            try {
                const key = $(item).find("span").text()
                const value = key.substring(31, 37)
                crawlData.push({ value })
            } catch (error) {
                console.log("解析错误:", error)
            }
        })

        console.log("爬虫完成，数据已更新")
    } catch (error) {
        console.error("爬虫失败:", error.message)
    }
}

// 定义爬虫路由 - 放在全局作用域
app.get("/api/cheerio", (req, res) => {
    res.send({
        code: 200,
        data: crawlData // 返回已抓取的数据
    })
})

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器启动成功：http://localhost:${PORT}`)

    // 服务器启动后再执行爬虫
    fetchData().catch(err => {
        console.error("初始爬虫失败:", err)
    })

    // 定时更新数据（可选）
    // setInterval(fetchData, 60 * 60 * 1000) // 每小时更新一次
})