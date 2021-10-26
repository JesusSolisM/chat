const socket = io()

new Vue({
    el: '#app',
    data: {
        step: 'default',
        nombre: null,
        mensaje: null,
        mensajes: [],
        usuario: null,
        usuarios: []
    },

    methods: {
        send() {
            if (this.mensaje!=null){
                socket.emit('chat-message', {
                    nombre: this.nombre,
                    mensaje: this.mensaje,
                    date: new Date().getTime()
                })
                this.mensaje = null;
            }
        },

        signIn() {
            if (!this.nombre) {
                return;
            }

            this.step = 'chat';

            socket.emit('newUser', {
                usuario: this.nombre
            })
        }
    },
    mounted() {
        socket.on('chat-message', (msg) => {
            this.mensajes.push(msg);

            setTimeout(() => {
                const chatContainer = document.querySelector(".chat-container");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10);
        });

        socket.on('listaUsuarios', (listado) => {
            this.usuarios = [];
            this.usuarios.push(listado);

            setTimeout(() => {
                const UsuariosContainer = document.querySelector(".UsuariosContainer");
                UsuariosContainer.resetscrollTop = UsuariosContainer.scrollHeight;
            }, 5);
        });

        socket.on('loadMsjs', data => {
            this.mensajes = [];
            for (let i=0; i < data.length; i++) {
                this.mensajes.push(data[i]);
            }
        });
    },
});