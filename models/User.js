// models/user.js
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  name: {type:String, required:true},
  lastname: String,
  personalWeb: String,
  email: {type:String, required:true},
  description: String,
  picture: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
