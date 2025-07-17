import mysql12 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const con = mysql12.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000
});

  async function bdOperation(sql, params = []) {
    return new Promise((resolve, reject) => {
      con.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

export {bdOperation}