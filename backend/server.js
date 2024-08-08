import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import router from './routes/goalRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'

const port = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/goals", router)

app.use(errorHandler)

app.listen(port, ()=>console.log(`server running on port ${port}`))