const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { setUser } = require("../services/auth");

async function handleCreateNewUser(req, res) {
  const salt = 10;
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, salt);
    const userCheck = await User.findOne({ email: email });
    if (userCheck) {
      return res.redirect('/signup');
    } else {
      const newUser = await User.create({
        name,
        email,
        password:hashPassword,
        role: 'NORMAL',
      });
      return res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
    return res.redirect('/signup');
  }
}

async function handleUserLogin(req,res) {
    const {email,password} = req.body;
    const  user = await User.findOne({email:email});
    if(!user){
        return res.render('login',{
          messageUser : "user does not exists."
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.render('login',{
        messagePassword : "Wrong Password"
      });
    }
    const token = setUser(user);
    res.cookie('token', token );
    return res.redirect('/')
}

async function handleUserLogout(req,res) {
  res.clearCookie('token');
  res.redirect('/login');
}

module.exports = {
  handleCreateNewUser,
  handleUserLogin,
  handleUserLogout
};
