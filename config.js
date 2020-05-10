const path = require('path'); // 核心对象
module.exports = {
  viewDir:path.resolve('./views'),
  staticDir:path.resolve('./public'),
  appPort:8888,
  uploadDir:path.resolve('./public/files'),
  dbConfig:{
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'node_music'
  }
}