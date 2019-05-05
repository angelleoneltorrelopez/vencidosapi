const UserModel = require('../models/users');

module.exports = app => {

  app.get('/users', (req, res) => {
    UserModel.getUser((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/users', (req, res) => {
    var userData = {
      id: null,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    UserModel.insertUser(userData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Usuario ingresado",
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

  app.put('/users/:id', (req, res) => {
    const userData = {
      id: req.params.id,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    UserModel.updateUser(userData, function (err, data) {
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

  app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    UserModel.deleteUser(id, (err, data) =>  {
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
