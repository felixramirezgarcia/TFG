const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.Promise = global.Promise;
mongoose.connect(mongodb.URI,{ useNewUrlParser: true })
        .then(() => {
          console.log('Conexion correcta');
        })
        .catch(err => console.log(err));
