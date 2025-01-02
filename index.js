const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { connectDb } = require('./connection');
// const { checkAuth, restrictLoggedInUserOnly } = require('./middlewares/auth');
const {checkForAuthentication, restrictTo}  = require('./middlewares/auth')


const todoRouter = require('./routes/todo');
const userRouter = require('./routes/user');
const staticRouter = require('./routes/static');

const app = express()
const PORT = 3000;

connectDb('mongodb://localhost:27017/todo-app')
    .then(()=>{
        console.log('connected to mongoDB successfully')
    }).catch((err)=>{
        console.log('connection failed : ',err)
    })

app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(checkForAuthentication);

// routes
app.use('/todo',restrictTo(['NORMAL','ADMIN']),todoRouter);
app.use('/user',userRouter);
app.use('/',staticRouter);

//views
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.listen(PORT,(err)=>{
    if (err){
        console.log(`err in listning the port : ${err}`)
    }else{
        console.log(`listening on port ${PORT}`);
    }
})