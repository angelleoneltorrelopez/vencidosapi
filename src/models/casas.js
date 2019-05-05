const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'angelzero87A',
  database: 'vencimiento'
});

let casaModel = {};

casaModel.getCasa = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM casa ORDER BY nombrecasa ASC',
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

casaModel.searchCasa = (name, callback) => {
  if (connection) {
    var sqlExists = 'SELECT * FROM casa WHERE nombrecasa like "%"'+connection.escape(name)+'"%"';
    connection.query(sqlExists, (err, row) => {
      if (err) {
        throw err
      }
      else {
        callback(null, row);
      }
    })
  }
};

casaModel.insertCasa = (  casaData, callback) => {
  if (connection) {
    connection.query('INSERT INTO casa SET ?', casaData,
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

casaModel.updateCasa = (casaData, callback) => {
  if (connection) {
    const sql = `
      UPDATE casa SET
      nombrecasa = ${connection.escape(casaData.nombrecasa)}
      WHERE idcasa = ${casaData.idcasa}`;

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

casaModel.deleteCasa = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM casa WHERE idcasa = ${connection.escape(id)}`;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM casa WHERE idcasa=` + connection.escape(id);
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else{
            callback(null, {
              "msg": "ELIMINADO",
              row
            });
          }
        });
      } else {
        callback(null, {
          "msg": "NO EXISTE"
        });
      }
    });
  }
}

module.exports = casaModel;
