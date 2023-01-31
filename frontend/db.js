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
  query =
    "CREATE TABLE IF NOT EXISTS db.Jobs ( Uuid varchar(255), Result varchar(1024))";
  connection.query(query);
}

module.exports = connection;
