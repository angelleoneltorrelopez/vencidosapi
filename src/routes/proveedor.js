const ProveedorModel = require('../models/proveedores');

module.exports = app => {

  app.get('/proveedores', (req, res) => {
    ProveedorModel.getProveedor((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/proveedores', (req, res) => {
    var proveedorData = {
      idproveedor: null,
      nombreprov: req.body.nombreprov
    };
    ProveedorModel.insertProveedor(proveedorData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "PROVEEDOR CREADO",
          data: data
        });
        // res.redirect('/users/' + data.insertId);
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    });
  });

  app.put('/proveedores/:idproveedor', (req, res) => {
    const proveedorData = {
      idproveedor: req.params.idproveedor,
      nombreprov: req.body.nombreprov
    };
    ProveedorModel.updateProveedor(proveedorData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({
          success: true,
          msg: "PROVEEDOR ACTUALIZADO",
          data});
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/proveedores/:idproveedor', (req, res) => {
    var id = req.params.idproveedor;
    ProveedorModel.deleteProveedor(id, (err, data) =>  {
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
