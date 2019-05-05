const IngresoModel = require('../models/ingresos');

module.exports = app => {

  app.get('/ingresos', (req, res) => {
    IngresoModel.getIngreso((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/ingresos', (req, res) => {
    var ingresoData = {
      Id: null,
      idproducto: req.body.nombre_productos,
      idcasa: req.body.nombrecasa,
      idproveedor: req.body.nombreprov,
      Politica: req.body.Politica,
      Caducidad: req.body.Caducidad,
      Lote: req.body.Lote,
      Estado: req.body.Estado,
      Usuario: req.body.Usuario
    };
    IngresoModel.insertIngreso(ingresoData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Producto Ingresado",
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

  app.put('/ingresos/:Id', (req, res) => {
    const ingresoData = {
      Id: req.params.Id,
      idproducto: req.body.nombre_productos,
      idcasa: req.body.nombrecasa,
      idproveedor: req.body.nombreprov,
      Politica: req.body.Politica,
      Caducidad: req.body.Caducidad,
      Lote: req.body.Lote,
      Estado: req.body.Estado
    };
    IngresoModel.updateIngreso(ingresoData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({
          success: true,
          msg: "Actualizado",
          data});
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/ingresos/:Id', (req, res) => {
    var id = req.params.Id;
    IngresoModel.deleteIngreso(id, (err, data) =>  {
      if (data && data.msg === 'Eliminado' || data.msg == 'No Existe') {
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
