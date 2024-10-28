const auth = require("../auth/auth");
const User = require("../models/user");
const thematic = require("../models/thematic");
const category = require("../models/category");


require("dotenv").config();


module.exports = {
    async createUsers() {
        const admin = new User({
            email: 'admin@example.com',
            username: 'rogermanzo',
            password: await auth.hashPassword(process.env.PASSWORD_ADMIN),
            role: 'admin'
        });

        const lector = new User({
            email: 'lector@example.com',
            username: 'lector1',
            password: await auth.hashPassword('1234'),
            role: 'lector'
        });

        const creador = new User({
            email: 'creador@example.com',
            username: 'creador1',
            password: await auth.hashPassword('1234'),
            role: 'creador'
        });

        admin.save();
        lector.save();
        creador.save();
    },

    createCategory(){
        const cr = new category({
            type: ".txt"
        });

        cr.save();
    },

    createThematic(){
        const thmatic = new thematic({
            name: 'Futbol',
            permission: ['videos', 'imagenes']
        })

        thmatic.save();
    }
}
