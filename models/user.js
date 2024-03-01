const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//schema is the structure and the rule that is define so that data insert into it will be of that types
//A database schema is a blueprint or architecture of how our data will look

//in mongodb first it came database than collections then documents
//where collection is like row in sql and documents fields is like column data in sql

//where  Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  address:{
    type:String,
    required: true
  },
  number:{
    type:Number,
    required: true
  },
},  //this will auto update the timestamp when we do inserting or updating documents of this type schema
{ timestamps: true });

// Hash the password before saving
UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Hash the password before saving
UserSchema.pre('findById', async function(next) {
  
});


const User = mongoose.model('User', UserSchema);
module.exports = User;

/*at first we make a schema that define structure and then created model based on that schema in 33 by 
  passing 2args 1st is singular name of collection then the schema that define structure for that object */

  //and finally exporting that User models which is later used to do CRUD operation