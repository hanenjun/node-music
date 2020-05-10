var mysql = require('mysql');
const { dbConfig } = require('../config.js');
var pool  = mysql.createPool(dbConfig);
 
var db = {};

db.q = function (sql,params) {
  return new Promise((resolve,reject)=>{
    // 取出链接
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql,params, function (error, results, fields) {
            // console.log(`${sql}=>${params}`);
             // 释放连接
            connection.release();
            if(error) {
              reject(err);
              return;
            }
            resolve(results);  
      });
    });
  });
}


// 导出对象
module.exports = db;
