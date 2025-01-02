const express = require("express");
const { handleCreateNewUser, handleUserLogin, handleUserLogout } = require("../controllers/user");
const router = express.Router();

router.post("/", handleCreateNewUser);
router.post('/login',handleUserLogin);
router.get('/logout',handleUserLogout);

module.exports = router;