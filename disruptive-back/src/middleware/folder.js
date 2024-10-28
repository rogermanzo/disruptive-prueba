const fs = require('fs');

// Verificar si la carpeta uploads existe
module.exports = {
    createStaticFolder(){
        if (!fs.existsSync('./uploads')) {
            // Crear la carpeta uploads si no existe
            fs.mkdir('./uploads', (err) => {
                if (err) {
                console.error('Error al crear la carpeta uploads:', err);
                } else {
                console.log('Carpeta uploads creada con éxito!');
                }
            });
        }
    }
};
    