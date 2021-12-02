const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "w3epjhex7h2ccjxx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "s5tnidjs2bhcr6ky",
    password: "ai34zo7drtunmfzu",
    database: "f0cwdfxcqlreiouj"
});

module.exports = pool;
