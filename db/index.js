//数据库
const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'db'
})
module.exports = db
// const sqlStr = 'select * from table1'
// db.query(sqlStr, (err, results) => {
//     if (err) return console.log(err.message)
//     console.log(results)
// })

// const sqlStr = 'insert into table1 (name,height) values (?,?)'
// const sqlStr = 'insert into table1 set ?'

