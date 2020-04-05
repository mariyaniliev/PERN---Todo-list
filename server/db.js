const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "9408038282",
  host: "localhost",
  port: "5432",
  database: "perntodo"
})

module.exports = pool;