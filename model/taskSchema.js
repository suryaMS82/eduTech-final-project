const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskschema = new schema({
    project:String,
    descri:String,
    completed:Boolean,
    date:Date ,

});

const addtask = mongoose.model('todotask',taskschema);
module.exports=addtask;
