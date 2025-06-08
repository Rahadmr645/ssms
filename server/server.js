import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import connectToMongo from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import User from './model/userModel.js';
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*'
  }
});


const PORT = process.env.PORT || 3001;

const usersSocketMap = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket._id);

  socket.on('register_user', (userId) => {
    usersSocketMap[userId] = socket.id;
  });

  socket.on('send_message', async ({ from, toEmail, message }) => {
    const fromUser = await User.findOne({ email: from }).populate('friends');

    const toUser = await User.findOne({ email: toEmail })

    if (!fromUser || !toUser) return;

    const isFriend = fromUser.friends.some(f => f._id.toString() === toUser._id.toString());


    if (!isFriend) return;


    const receiverShocketId = usersSocketMap[toUser._id.toString()]
    if (receiverShocketId) {
      io.to(receiverShocketId).emit('receive_message', { from, message })
    }
  })
})

app.use(express.json());

// router section 
app.use('/api/user', userRoutes);
app.use('/', (req, res) => {
  res.json("you are welcome")
});
//  mongo connection
connectToMongo();


// socket.io logic
io.on('connection', (socket) => {
  console.log('client connected', socket.id);


  socket.on('send_message', (dt) => {
    console.log('Recivedd:', dt);
    io.emit('receive_massge', dt);
  });
});



server.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
});