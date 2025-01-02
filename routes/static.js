const express = require("express");
const Todo = require('../models/todo');
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get('/admin/todos', restrictTo(['ADMIN']),async (req,res)=>{
    if(!req.user){
        res.redirect('/login');
    }
    const allTodos = await Todo.find({})
    res.render('home', {
        todos : allTodos
    });
})


router.get('/',async (req,res)=>{
    if(!req.user){
        res.redirect('/login');
    }
    const allTodos = await Todo.find({createdBy : req.user.id})
    res.render('home', {
        todos : allTodos
    });
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/signup',(req,res)=>{
    res.render('signup');
})

module.exports = router;
