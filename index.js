import authRouter from "./src/modules/auth/auth.router.js"
import userRouter from "./src/modules/user/user.router.js"
import categoryRouter from "./src/modules/category/category.router.js"
import medicineRouter from "./src/modules/medicine/medicine.router.js"
import cartRouter from "./src/modules/cart/cart.router.js"



import connectDB from "./DB/connection.js"
import express from 'express';
import cors from 'cors';


const app = express()
const port = 5000



app.use(express.json({})) //convert buffer date
connectDB()// connected dataBase

app.use(cors());

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/medicine', medicineRouter)
app.use('/cart', cartRouter)


app.all("*",(req,res,next)=>{
    return res.json("Page Not Found 404")
})


app.listen(port, () => {
    console.log(`Server is Running on Port........${port}`)
})