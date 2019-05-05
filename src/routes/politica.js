const PoliticaModel = require('../models/politicas');

module.exports = app => {

  app.get('/politicas', (req, res) => {
    PoliticaModel.getPolitica((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/politicas', (req, res) => {
    var politicaData = {
      idasignacion: null,
      idcasa: req.body.idcasa,
      idproveedor: req.body.idproveedor,
      politica: req.body.politica
    };
    PoliticaModel.insertPolitica(politicaData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Politica ingresada",
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

  app.put('/politicas/:idasignacion', (req, res) => {
    const politicaData = {
      idasignacion: req.params.idasignacion,
      idcasa: req.body.idcasa,
      idproveedor: req.body.idproveedor,
      politica: req.body.politica
    };
    PoliticaModel.updatePolitica(politicaData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({data});
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/politicas/:idasignacion', (req, res) => {
    var id = req.params.idasignacion;
    PoliticaModel.deletePolitica(id, (err, data) =>  {
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
