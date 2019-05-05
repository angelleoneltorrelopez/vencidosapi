const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'angelzero87A',
  database: 'vencimiento'
});

let humedadModel = {};

humedadModel.getHumedad = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM humedad',
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

humedadModel.searchHumedad = (name, callback) => {
  if (connection) {
    var sqlExists = 'SELECT * FROM humedad WHERE nombrecasa like "%"'+connection.escape(name)+'"%"';
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

humedadModel.insertHumedad = (  humedad, callback) => {
  if (connection) {
    connection.query(`INSERT INTO humedad (valor) values(${connection.escape(humedad)})`,
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

humedadModel.updateHumedad = (humedadData, callback) => {
  if (connection) {
    const sql = `
      UPDATE humedad SET
      nombrecasa = ${connection.escape(humedadData.nombrecasa)}
      WHERE idhumedad = ${humedadData.idhumedad}`;

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

humedadModel.deleteHumedad = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM humedad WHERE idhumedad = ${connection.escape(id)}`;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM humedad WHERE idhumedad=` + connection.escape(id);
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
module.exports = humedadModel;
