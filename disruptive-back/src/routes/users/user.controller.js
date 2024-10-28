
const User = require('../../models/user');
const auth = require('../../auth/auth');

module.exports = {

    // TODO : CREATE & UPDATE
  async createUser(req, res) {
    if (!req.body) {
      return res.status(400).json({ message: 'Invalid request body' });
    }
    const { email, username, password, role } = req.body;

    const user = new User({
      email,
      username,
      password: await auth.hashPassword(password),
      role
    });

    req.user = user;

    try {
        
        if (req.user.role === 'creador' || req.user.role === 'lector') {
            await user.save();
            res.json({ message: 'Usuario creado con éxito' });
        } else {
            res.status(403).json({ message: 'No tienes permiso para crear usuarios' });
        }
    } catch (error) {
      //console.log(error);
      res.status(400).json({ message: 'Error al crear usuario' });
    }
  },

  async usersMe (req, res) {
    console.log(req.user.id)
    res.status(200).json({ id: req.user.id });
  },
  
  async updateUser(req, res) {
    const { email, username, password, role } = req.body;
    try {
      const user = await User.findOne({ email, username });
      if (!user) {
        res.status(404).json({ message: 'No se encontró el usuario con el email y username proporcionados' });
      } else {

        // verificación de rol
        if (user.role === 'admin') {
            res.status(403).json({ message: 'No se permite actualizar el rol de un administrador' });
        } else if (role === 'admin' && req.user.role !== 'admin') {
            res.status(403).json({ message: 'No tienes permiso para hacer un usuario administrador' });    
        }
        
        // verificación existencia de username y email
        if (email && await User.findOne({ email: email, _id: { $ne: user._id } })) {
            res.status(400).json({ message: 'El email ya está en uso' });
        } else if (username && await User.findOne({ username: username, _id: { $ne: user._id } })) {
            res.status(400).json({ message: 'El username ya está en uso' });
        } else {
            user.email = email;
            user.username = username;
            if (password) {
                user.password = await auth.hashPassword(password);
            }
            if (role && req.user.role !== 'admin') {
                user.role = role;
            }
            await user.save();
            res.json({ message: 'Usuario actualizado con éxito' });
        }
      }
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar usuario' });
    }


  }
};