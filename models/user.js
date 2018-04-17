var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


// user SCHEMA-attributes / characteristic / fields

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,

    },
    profile: {
        name: {
            type: String,
            default: ''
        },
        picture: {
            type: String,
            default: ''
        }
    },
    address: {
        type: String,
        history: [{
            date: Date,
            paid: { type: String, default: 0},
            item: {type: Schema.Types.ObjectId, ref: ''}
        }]
    }

});


//Hash the password before we add into database
// var user = new user();
// var user1= new user();
// this is changing every create a new user
userSchema.pre('save', function(next){
    var user = this; //this is suggescion object
    if(!user.isModified('password'))
    return next();
    bcrypt.genSalt(10, function(err, next, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, next, hash){
            if(err) return next(err);
            user.password = hash;
            

        })
    });
});



//compare password in the database and the one that user type in
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

