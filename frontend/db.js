const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mysql",
  user: "user",
  password: "password",
  database: "db",
});

try {
  connection.connect(console.log("Connected to database successfully"));
  setUp();
} catch (error) {
  console.log(error);
}

function setUp() {
  let query = "DROP TABLE IF EXISTS db.Jobs";
  connection.query(query);
  query = "CREATE TABLE db.Jobs ( Uuid INT, Result varchar(255));";
  connection.query(query);
}

module.exports = connection;
