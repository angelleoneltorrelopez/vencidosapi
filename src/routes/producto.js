const ProductoModel = require('../models/productos');

module.exports = app => {

  app.get('/productos', (req, res) => {
    ProductoModel.getProductos((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/productos/:descripcion', (req, res) => {
    var name = req.params.descripcion;
    ProductoModel.searchProducto(name, (err, data) =>  {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });

  app.get('/productosmax', (req, res) => {
    ProductoModel.maxProducto((err, data) =>  {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });

  app.post('/productos', (req, res) => {
    var productoData = {
      idproductos: null,
      codigobarra: req.body.codigobarra,
      descripcion: req.body.descripcion,
      generico: req.body.generico,
      idcasa: req.body.idcasa,
      idproveedor: req.body.idproveedor,
      clasificacion: req.body.clasificacion,
      bono: req.body.bono,
      vineta: req.body.vineta,
      controlado: req.body.controlado,
      bloqueo: req.body.bloqueo,
      minima: req.body.minima,
      maxima: req.body.maxima,
      efectivo: req.body.efectivo,
      tarjeta: req.body.tarjeta,
      especial: req.body.especial,
      costofactura: req.body.costofactura,
      descuento: req.body.descuento,
      costototal: req.body.costototal,
      cantidad: req.body.cantidad,
      bonificacion: req.body.bonificacion,
      cantidadtotal: req.body.cantidadtotal,
      utilidad: req.body.utilidad,
      preciopublico: req.body.preciopublico,
      docenadescuento: req.body.docenadescuento,
      docenaprecio: req.body.docenaprecio,
      docenaminimo: req.body.docenaminimo,
      cientodescuento: req.body.cientodescuento,
      cientoprecio: req.body.cientoprecio,
      cientominimo: req.body.cientominimo

    };
    ProductoModel.insertProducto(productoData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "PRODUCTO CREADO",
          data: data
        });
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    });
  });

  app.put('/productos/:idproductos', (req, res) => {
    const productoData = {
      idproductos: req.params.idproductos,
      codigobarra: req.body.codigobarra,
      descripcion: req.body.descripcion,
      generico: req.body.generico,
      idcasa: req.body.idcasa,
      idproveedor: req.body.idproveedor,
      clasificacion: req.body.clasificacion,
      bono: req.body.bono,
      vineta: req.body.vineta,
      controlado: req.body.controlado,
      bloqueo: req.body.bloqueo,
      minima: req.body.minima,
      maxima: req.body.maxima,
      efectivo: req.body.efectivo,
      tarjeta: req.body.tarjeta,
      especial: req.body.especial,
      costofactura: req.body.costofactura,
      descuento: req.body.descuento,
      costototal: req.body.costototal,
      cantidad: req.body.cantidad,
      bonificacion: req.body.bonificacion,
      cantidadtotal: req.body.cantidadtotal,
      utilidad: req.body.utilidad,
      preciopublico: req.body.preciopublico,
      docenadescuento: req.body.docenadescuento,
      docenaprecio: req.body.docenaprecio,
      docenaminimo: req.body.docenaminimo,
      cientodescuento: req.body.cientodescuento,
      cientoprecio: req.body.cientoprecio,
      cientominimo: req.body.cientominimo
    };
    ProductoModel.updateProducto(productoData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({
          success: true,
          msg: "PRODUCTO ACTUALIZADO",
          data
        });
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/productos/:idproductos', (req, res) => {
    var id = req.params.idproductos;
    ProductoModel.deleteProducto(id, (err, data) =>  {
      if (data && data.msg === 'ELIMINADO' || data.msg == 'NO EXISTE') {
        res.json({
          success: 'true',
          data
        });
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });
};
