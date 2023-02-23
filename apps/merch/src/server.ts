import express from "express"
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from  'morgan'

// import routers
import indexRouter from './routes/index'
// import usersRouter from './routes/users'

const app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.listen("3000", ()=> console.log("server started on port 3000"))

export default app
