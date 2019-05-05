const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'angelzero87A',
  database: 'vencimiento'
});

let proveedorModel = {};

proveedorModel.getProveedor = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM proveedores ORDER BY nombreprov ASC',
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

proveedorModel.insertProveedor = (proveedorData, callback) => {
  if (connection) {
    connection.query('INSERT INTO proveedores SET ?', proveedorData,
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

proveedorModel.updateProveedor = (proveedorData, callback) => {
  if (connection) {
    const sql = `
      UPDATE proveedores SET
      nombreprov = ${connection.escape(proveedorData.nombreprov)}
      WHERE idproveedor = ${proveedorData.idproveedor}`;

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

proveedorModel.deleteProveedor = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM proveedores WHERE idproveedor = ${connection.escape(id)}`;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM proveedores WHERE idproveedor =` + connection.escape(id);
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

module.exports = proveedorModel;
