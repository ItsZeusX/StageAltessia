var mysql = require('mysql')

var cnx = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'English'
})

cnx.connect()

cnx.query('select * from exercises', function (err, rows, fields) {
  if (err) throw err
  console.log(rows[0])
})

cnx.end()