const CasaModel = require('../models/casas');

module.exports = app => {

  app.get('/casas', (req, res) => {
    CasaModel.getCasa((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/casas/:nombrecasa', (req, res) => {
    var name = req.params.nombrecasa;
    CasaModel.searchCasa(name, (err, data) =>  {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });

  app.post('/casas', (req, res) => {
    var casaData = {
      idcasa: null,
      nombrecasa: req.body.nombrecasa
    };
    CasaModel.insertCasa(casaData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "CASA CREADA",
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

  app.put('/casas/:idcasa', (req, res) => {
    const casaData = {
      idcasa: req.params.idcasa,
      nombrecasa: req.body.nombrecasa
    };
    CasaModel.updateCasa(casaData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({
          success: true,
          msg: "CASA ACTUALIZADA",
          data});
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/casas/:idcasa', (req, res) => {
    var id = req.params.idcasa;
    CasaModel.deleteCasa(id, (err, data) =>  {
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
