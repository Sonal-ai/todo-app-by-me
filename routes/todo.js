const express = require('express');
const { handleCreateNewTodo, handleDeleteTodo, handleEditTodo } = require('../controllers/todo');
const router = express.Router();

router.post('/', handleCreateNewTodo);
router.post('/edit',handleEditTodo)
router.get('/delete', handleDeleteTodo);

module.exports = router