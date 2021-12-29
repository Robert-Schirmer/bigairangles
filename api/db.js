import * as mysql from "mysql";

const pool = mysql.createPool({
  multipleStatements: true,
  connectionLimit: 10,
  host: '127.0.0.1',
  port: '3306',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default pool;
