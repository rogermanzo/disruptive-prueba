
const { generateToken, comparePassword } = require('../../auth/auth');
const User = require('../../models/user');

module.exports = {

   // TODO : Login auth
   async loginAuth(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(401).json({message: 'Email o contraseña incorrectos'});
    }

    const isValid = await comparePassword(password, user.password);

    if(!isValid) {
        return res.status(401).json({message: 'Email o contraseña incorrectos'})
    }

    const token = await generateToken(user);
    res.json({message: 'Ha iniciado sesión correctamente', token});
   },
};