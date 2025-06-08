import express from 'express' 
import dotenv from 'dotenv' 
dotenv.config();
import connectToMongo from './config/db.js'
const app = express();


import userRoutes from './routes/userRoutes.js'
const PORT = process.env.PORT;


app.use(express.json());


// router section 
app.use('/api/user', userRoutes);
app.use('/',(req,res) => {
  res.json("you are welcome")
});
 
 connectToMongo();
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
});