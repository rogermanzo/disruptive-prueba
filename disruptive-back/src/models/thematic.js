const mongoose = require('mongoose');


const thematicSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permission: { type: [String], enum: ["videos", "imagenes", "documentos", "links"], default: [], required: true }
});

module.exports = mongoose.model('Thematic', thematicSchema);