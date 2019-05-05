const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'angelzero87A',
  database: 'vencimiento'
});

let userModel = {};

userModel.getUser = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM tbl_user ORDER BY username ASC',
      (err, rows) => {
        if (err) {
          throw err
        }
        else {
          callback(null, rows);
        }
      }
    )
  }
};

userModel.insertUser = (  userData, callback) => {
  if (connection) {
    connection.query('INSERT INTO tbl_user SET ?', userData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {'insertId': result.insertId})
        }
      }
    )
  }
};

userModel.updateUser = (userData, callback) => {
  if (connection) {
    const sql = `
      UPDATE tbl_user SET
      username = ${connection.escape(userData.username)},
      password = ${connection.escape(userData.password)},
      email = ${connection.escape(userData.email)}
      WHERE id = ${userData.id}`;

    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        callback(null, {
          "msg": "success"
        })
      }
    });
  }
};

userModel.deleteUser = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM tbl_user WHERE id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM tbl_user WHERE id =` + connection.escape(id);
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else{
            callback(null, {
              "msg": "Eliminado"
            });
          }
        });
      } else {
        callback(null, {
          "msg": "No Existe"
        });
      }
    });
  }
}

module.exports = userModel;
