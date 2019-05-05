const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'angelzero87A',
  database: 'vencimiento'
});

let productoModel = {};

productoModel.getProductos = (callback) => {
  if (connection) {
    connection.query(`SELECT idproductos, codigobarra, descripcion, generico, productos.idcasa, casa.nombrecasa, idproveedor,
clasificacion, bono, vineta, controlado, bloqueo, minima, maxima, efectivo, tarjeta, especial,
costofactura, descuento, costototal, cantidad, bonificacion, cantidadtotal, utilidad, preciopublico,
docenadescuento, docenaprecio, docenaminimo, cientodescuento, cientoprecio, cientominimo, existencia
FROM productos
JOIN casa ON productos.idcasa = casa.idcasa ORDER BY descripcion ASC`,
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

productoModel.searchProducto = (name, callback) => {
  if (connection) {
    var sqlExists = `SELECT idproductos, codigobarra, descripcion, generico, productos.idcasa, casa.nombrecasa, idproveedor,
clasificacion, bono, vineta, controlado, bloqueo, minima, maxima, efectivo, tarjeta, especial,
costofactura, descuento, costototal, cantidad, bonificacion, cantidadtotal, utilidad, preciopublico,
docenadescuento, docenaprecio, docenaminimo, cientodescuento, cientoprecio, cientominimo, existencia
FROM productos JOIN casa ON productos.idcasa = casa.idcasa WHERE descripcion like "%" ${connection.escape(name)} "%" ORDER BY descripcion ASC`;
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

productoModel.maxProducto = (callback) => {
  if (connection) {
    var sqlExists = `SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'vencimiento' AND TABLE_NAME = 'productos'`;
    connection.query(sqlExists, (err, row) => {
      if (err) {
        throw err
      }
      else {
        callback(null, row[0].AUTO_INCREMENT);
      }
    })
  }
};

productoModel.insertProducto = (  productoData, callback) => {
  if (connection) {
    connection.query('INSERT INTO productos SET ?', productoData,
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

productoModel.updateProducto = (productoData, callback) => {
  if (connection) {
    const sql = `
      UPDATE productos SET
      codigobarra = ${connection.escape(productoData.codigobarra)},
      descripcion = ${connection.escape(productoData.descripcion)},
      generico = ${connection.escape(productoData.generico)},
      idcasa = ${connection.escape(productoData.idcasa)},
      idproveedor = ${connection.escape(productoData.idproveedor)},
      clasificacion = ${connection.escape(productoData.clasificacion)},
      bono = ${connection.escape(productoData.bono)},
      vineta = ${connection.escape(productoData.vineta)},
      controlado = ${connection.escape(productoData.controlado)},
      bloqueo = ${connection.escape(productoData.bloqueo)},
      minima = ${connection.escape(productoData.minima)},
      maxima = ${connection.escape(productoData.maxima)},
      efectivo = ${connection.escape(productoData.efectivo)},
      tarjeta = ${connection.escape(productoData.tarjeta)},
      especial = ${connection.escape(productoData.especial)},
      costofactura = ${connection.escape(productoData.costofactura)},
      descuento = ${connection.escape(productoData.descuento)},
      costototal = ${connection.escape(productoData.costototal)},
      cantidad = ${connection.escape(productoData.cantidad)},
      bonificacion = ${connection.escape(productoData.bonificacion)},
      cantidadtotal = ${connection.escape(productoData.cantidadtotal)},
      utilidad = ${connection.escape(productoData.utilidad)},
      preciopublico = ${connection.escape(productoData.preciopublico)},
      docenadescuento = ${connection.escape(productoData.docenadescuento)},
      docenaprecio = ${connection.escape(productoData.docenaprecio)},
      docenaminimo = ${connection.escape(productoData.docenaminimo)},
      cientodescuento = ${connection.escape(productoData.cientodescuento)},
      cientoprecio = ${connection.escape(productoData.cientoprecio)},
      cientominimo = ${connection.escape(productoData.cientominimo)}
      WHERE idproductos = ${productoData.idproductos}`;

    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        callback(null, {
          "msg": "Actualizado"
        })
      }
    });
  }
};

productoModel.deleteProducto = (id, callback) => {
  if (connection) {
    var sqlExists = `
  SELECT * FROM productos WHERE idproductos = ${connection.escape(id)} `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM productos WHERE idproductos = ` + connection.escape(id);
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

module.exports = productoModel;
