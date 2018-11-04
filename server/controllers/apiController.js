const fetch = require('node-fetch');
const Todo = require('../models/todo');
const User = require('../models/users');

const mongoose = require('mongoose');
const mongoDB = 'mongodb://test:abc123@ds249583.mlab.com:49583/practice';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// exports.users = function(req, res, next){
// }