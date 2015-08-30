var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  initialize: function(){
  this.on('creating', this.hashPassword)
  },
  hashPassword: function(){
    var promisifiedFunc = Promise.promisify(bcrypt.hash);
    return promisifiedFunc(this.get('password'), null, null).bind(this)
    .then(function(hash){
      this.set('password', hash)
    });
  },
  comparePassword: function(enteredPassword, callback){
    bcrypt.compare(enteredPassword, this.get('password'),
    function(err, res){
      callback(res)
    })
  }
});

module.exports = User;