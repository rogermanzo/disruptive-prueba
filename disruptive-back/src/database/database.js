const mongoose = require('mongoose');


// drop table init database - dev
mongoose.connection.dropDatabase();


mongoose.connect('mongodb://mongo/mydb')
    .then(db => console.log('Conexión exitosa a ', db.connection.host))
    .catch(err => console.error(err));

module.exports = mongoose;