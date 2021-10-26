const path = require('path');
const express = require('express');
const app = express();

const mongoose = require('mongoose');

//Configuración del puerto para el servidor web/local
app.set('port', process.env.PORT || 3000);

//Conexion a la BD
mongoose.connect('mongodb://localhost:27017/chat-database')
    .then(db => console.log('DB conectada'))
    .catch(err => console.log(err));

//Archivos estaticos (se define la ruta de donde tomara index.html)
app.use(express.static(path.join(__dirname, 'public')))

//Inicializa el servidor, mediante el puerto asignado
const server = app.listen(app.get('port'), () => {
    
});

const configuracion = require('socket.io');
const Conexion = configuracion(server);

require('./sockets')(Conexion);