const mysql = require("mysql");
const util = require("util");

const conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "records_database",
});

conection.connect((error)=>{
  if(error) {
      throw error;
  }

  console.log('Conection Successful');
});

const qy = util.promisify(conection.query).bind(conection);

module.exports = qy;
