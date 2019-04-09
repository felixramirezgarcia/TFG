'use strict'

var User = require('../models/userschema');

/* POST user. */
function saveUser(req, res) {
  var user = new User();
  var params = req.body;

  if(params.email){
    user.email = params.email;
    user.password = params.password;
  }

  user.save((err, userStored) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(userStored){
        res.status(200).send({
          user : userStored
        });
      }else{
        res.status(200).send({
          message: 'No se ha almacenado'
        });
      }
    }
  });

}

function getUser(req, res) {
  var userId = req.params.id;

  User.findById(userId).exec((err,user) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(user){
        res.status(200).send({
          user
        });
      }else{
        res.status(404).send({
          message: 'No hay usuario o faltan parametros'
        });
      }
    }
  });
}


function getUserEmail(req, res) {
  var userEmail = req.params.email;

  User.findOne({email: userEmail}).exec((err,user) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(user){
        res.status(200).send({
          user
        });
      }else{
        res.status(404).send({
          message: 'No hay usuario o faltan parametros'
        });
      }
    }
  });
}

function getUsers(req, res) {
  User.find({}).exec((err,users) => {
  if(err){
    res.status(500).send({
      message: 'Error en el servidor'
    });
  }else{
    if(users){
      res.status(200).send({
        users
      });
    }else{
      res.status(404).send({
        message: 'No hay usuarios'
      });
    }
  }
});
}

module.exports = {
    saveUser,
    getUser,
    getUserEmail,
    getUsers
};
