const mysql = requeire("mysql2")
const pool = mysql.createPool(
{
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database:'registros',
}
)
module.exports = pool.promise()