const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'angelzero87A',
  database: 'vencimiento'
});

let ingresoModel = {};

ingresoModel.getIngreso = (callback) => {
  if (connection) {
    connection.query(`SELECT Id,productos.nombre_productos, casa.nombrecasa, proveedores.nombreprov, Politica, Caducidad, Lote,Estado, Usuario, regDate FROM ingreso
JOIN productos ON ingreso.idproducto = productos.idproductos
JOIN casa ON ingreso.idcasa = casa.idcasa
JOIN proveedores ON ingreso.idproveedor = proveedores.idproveedor `,
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

ingresoModel.insertIngreso = (  ingresoData, callback) => {
  if (connection) {
    connection.query('INSERT INTO ingreso SET ?', ingresoData,
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

ingresoModel.updateIngreso = (ingresoData, callback) => {
  if (connection) {
    const sql = `
      UPDATE ingreso SET
      idproducto = ${connection.escape(ingresoData.idproducto)},
      idcasa = ${connection.escape(ingresoData.idcasa)},
      idproveedor = ${connection.escape(ingresoData.idproveedor)},
      Politica = ${connection.escape(ingresoData.Politica)},
      Caducidad = ${connection.escape(ingresoData.Caducidad)},
      Lote = ${connection.escape(ingresoData.Lote)},
      Estado = ${connection.escape(ingresoData.Estado)}
      WHERE Id = ${ingresoData.Id}`;

    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        callback(null, {
          "msg": "Vencido Actualizado"
        })
      }
    });
  }
};

ingresoModel.deleteIngreso = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM ingreso WHERE Id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM ingreso WHERE Id=` + connection.escape(id);
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

module.exports = ingresoModel;
