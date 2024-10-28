const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'lector', 'creador'], default: 'lector' }
});


module.exports = mongoose.model('User', userSchema);