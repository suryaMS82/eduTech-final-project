const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    repassword : {
        type: String,
        require: true
    },
    number:{
        type:String,
        require: true
    },
    qualification:{
        type: String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    }

});

const User=mongoose.model('User',userSchema);

module.exports = User ;