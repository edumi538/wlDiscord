var mysql = require('mysql');
const serverCfg = require('../servercfg.json')
var pool = mysql.createPool({
  connectionLimit : 10, // default = 10
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : `${serverCfg.databasename}` 
});
module.exports = pool; 