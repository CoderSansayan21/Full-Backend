const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "TS200506",
    database: "ukistudentmanagement"
});

const promisePool = pool.promise();

promisePool.getConnection()
    .then(connection => {
        console.log("MySQL Connected");
        connection.release();
    })
    .catch(err => {
        console.log("Connection Failed");
        console.log(err);
    });

module.exports = promisePool;