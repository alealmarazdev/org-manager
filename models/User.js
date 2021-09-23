const mongoose = requiere('mongoose');

const UserSchema = new mongoose.Schema({
  key: {
    type: String,
    requiered: true,
    unique: true,
  },
  name: {
    type: String,
    requiered: [true, 'Please add a name'],
    maxLength: [100, ['Name cannot be more than 100 characters']],
  },
  email: {
    type: String,
    requiered: [true, 'Please add a email'],
    maxLength: [100, ['Email cannot be more than 100 characters']],
  },
  password: {
    type: String,
    requiered: [true, 'Please add a password'],
    maxLength: [100, ['Password cannot be more than 100 characters']],
  },
  resume: {
    type: String,
    requiered: [true, 'Please add a resume'],
    maxLength: [400, ['Resume cannot be more than 400 characters']],
  },
  skills: {
    type: String,
    requiered: [true, 'Please add a resume'],
    maxLength: [400, ['Resume cannot be more than 400 characters']],
  },
  teams: {
    type: String,
    requiered: true,
  },
});
