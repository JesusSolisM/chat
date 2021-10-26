//conexiones nuevas, usuarios, msj nuevos y escribiendo msj
const Chat = require('./models/mensajes');

module.exports = function(Conexion) {

    let listaUsuarios = [];

    Conexion.on('connection', (socket) => {

        socket.on('chat-message', async (data) => {
            Conexion.sockets.emit('chat-message', data);
            var msjNew = new Chat({
                nombre:data.nombre,
                mensaje:data.mensaje
            });

            await msjNew.save();
        })

        socket.on('newUser', async (usuario, cb) => {
            
            let listaMensjaes = await Chat.find({});

            socket.emit('loadMsjs', listaMensjaes);

            let control = 0;
            listaUsuarios.forEach(elemento => {
                if (elemento.usuario === usuario.usuario)
                    control = 1;
            });

            if (control === 0) {
                socket.usuario = usuario;
                listaUsuarios.push(socket.usuario);
                updateListaUsuarios();
            } else {
                cb(false);
            }
        });

        socket.on('disconnect', data => {
            if (!socket.usuario) return;
            listaUsuarios.splice(listaUsuarios.indexOf(socket.usuario), 1);
            updateListaUsuarios();
        });

        function updateListaUsuarios() {
            Conexion.sockets.emit('listaUsuarios', listaUsuarios);
        }
    })
}