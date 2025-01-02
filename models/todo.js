const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title : {
        type:String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    status :{
        type : String,
        required : true,
        default : 'incomplete',
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }
},{
    timestamps : true,
})

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;