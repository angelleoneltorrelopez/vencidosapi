const HumedadModel = require('../models/humedad');

module.exports = app => {

  app.get('/humedad', (req, res) => {
    HumedadModel.getHumedad((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/humedad/:nombrecasa', (req, res) => {
    var name = req.params.nombrecasa;
    HumedadModel.searchHumedad(name, (err, data) =>  {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });

  app.post('/humedad/:valor', (req, res) => {
var humedad = req.params.valor;
    HumedadModel.insertHumedad(humedad, (err, data) => {
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

  app.put('/humedad/:idhumedad', (req, res) => {
    const humedadData = {
      idhumedad: req.params.idhumedad,
      nombrecasa: req.body.nombrecasa
    };
    HumedadModel.updateHumedad(humedadData, function (err, data) {
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

  app.delete('/humedad/:idhumedad', (req, res) => {
    var id = req.params.idhumedad;
    HumedadModel.deleteHumedad(id, (err, data) =>  {
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
