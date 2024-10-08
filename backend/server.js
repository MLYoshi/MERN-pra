import path from 'path'
import express from 'express'
import colors  from 'colors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
dotenv.config();
import goalRouter from './routes/goalRoutes.js'
import userRouter from './routes/userRouters.js';
import errorHandler from './middleware/errorMiddleware.js'

const port = process.env.PORT || 8080

connectDB();

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 或者指定一个特定的域名
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use("/api/goals", goalRouter)
app.use("/api/users", userRouter)

app.use(errorHandler)

if (process.env.NODE_ENV == 'production'){
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'frontend/dist')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html' )))
}

app.listen(port, ()=>console.log(`server running on port ${port}`))