const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    type: { type: String, enum: [
        ".docx", ".txt",
        ".xlsx", ".xls",
        ".pdf", ".mkv", 
        ".jpg", ".png",
        ".mp4",], required: true, unique: true },
    deletedAt: { type: Date, default: null }
})

module.exports = mongoose.model('Category', categorySchema);