const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true, minlen: 6},
    createdAt:{
        type: Date,
        default: Date.now
    },
    favorites: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  },
]
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); 
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User',userSchema);