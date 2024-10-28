const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const {createUsers, createCategory, createThematic} = require('./seed/seed');
const { createStaticFolder } = require('./middleware/folder');
const app = express();

require('./database/database');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
createStaticFolder();
app.use('/uploads', express.static('uploads'))

//seeders admin
createUsers();
createCategory();
createThematic();

app.listen(3000);

app.use(require('./routes/indexRoutes'))

console.log('Servidor activo');