const Todo = require("../models/todo");

async function handleCreateNewTodo(req,res) {
    try{
        const {title,description} = req.body;
        await Todo.create({
            title:title,
            description:description,
            createdBy: req.user.id,
        })
        return res.redirect('/')
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while creating new todo' , error : err})
    }
}

async function handleDeleteTodo(req,res) {
    try {
        const {id} = req.query;
        await Todo.findByIdAndDelete(id);
        return res.redirect('/')
        }
    catch (error) {
        console.log(error)
    }
}

async function handleEditTodo(req,res) {
    try {
        const {id} = req.query;
        const {title,description,status} = req.body;       
        const updateTodo = await Todo.findByIdAndUpdate(id,{title:title,description:description , status : status})
        return res.redirect('/')
        }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleCreateNewTodo,
    handleDeleteTodo,
    handleEditTodo,
}