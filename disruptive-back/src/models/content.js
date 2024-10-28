const mongoose = require('mongoose');
const thematic = require('./thematic');
const fs = require('fs');


const contentSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    thematic: { type: mongoose.Schema.Types.ObjectId, ref: 'Thematic' },
    author: { type: String, required: true },
    files: [{ type: {filename: String, path: String} }],
    name: {type: String, required: false}
});

contentSchema.pre('save', async function(next) {
    try {
      const thmatic = await thematic.findById(this.thematic);
      const permission = thmatic.permission;
      const files = this.files;
  
      if (!permission) {
        throw new Error('Permission is not defined');
      }
  
      files.forEach((file) => {
        const filename = file.filename;
        const fileExtension = filename.split('.').pop();
  
        let allowedExtensions = [];

        console.log(permission.includes('videos'))
        console.log(permission.includes('imagenes'))
        console.log(permission.includes('documentos'))
        console.log(permission.includes('links'))

        if (permission.includes('videos')) {
          allowedExtensions += ['mp4', 'webm', 'ogg,'];
        } 
        if (permission.includes('imagenes')) {
          allowedExtensions += ['jpg', 'png', 'gif,'];
        } 
        if (permission.includes('documentos')) {
          allowedExtensions += ['pdf', 'doc', 'docx,'];
        } 
        if (permission.includes('links')) {
          // No file upload allowed for links
          return next(new Error('File upload not allowed'));
        }

        console.log(allowedExtensions)
        console.log(fileExtension)

        if (!allowedExtensions.includes(fileExtension)) {
            const filePath = file.path;
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log(`File ${filePath} deleted`);
              }
            });
            
            return next(new Error('File extension not allowed'));
        }
      
        });  
    next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Content', contentSchema);