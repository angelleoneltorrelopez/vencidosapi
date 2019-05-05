const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'angelzero87A',
  database: 'vencimiento'
});

let politicaModel = {};

politicaModel.getPolitica = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM asignacion ORDER BY idcasa ASC',
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

politicaModel.insertPolitica = (  politicaData, callback) => {
  if (connection) {
    connection.query('INSERT INTO asignacion SET ?', politicaData,
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

politicaModel.updatePolitica = (politicaData, callback) => {
  if (connection) {
    const sql = `
      UPDATE asignacion SET
      idcasa = ${connection.escape(politicaData.idcasa)},
      idproveedor = ${connection.escape(politicaData.idproveedor)},
      politica = ${connection.escape(politicaData.politica)}
      WHERE idasignacion = ${politicaData.idasignacion}`;

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

politicaModel.deletePolitica = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM asignacion WHERE idasignacion = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM asignacion WHERE idasignacion =` + connection.escape(id);
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

module.exports = politicaModel;
