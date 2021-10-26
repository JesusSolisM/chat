const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChatSchema = new Schema({
    nombre: String,
    mensaje: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Chat', ChatSchema);