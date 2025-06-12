import express from 'express'

import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../model/userModel.js';
dotenv.config();
const router = express.Router();

// create routes
router.post('/create', async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: "plese inter all the input" })

    const isExist = await User.findOne({ email });
    if (isExist) return res.status(500).json({ msg: "user is already exist" })
    const salt = await bcrypt.genSalt(10);
    const hassPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hassPass,
    });
    const token = JWT.sign({ name: newUser.name, id: newUser._id, email: newUser.email }, SECRET_KEY, { expiresIn: "1d" })
    await newUser.save();

    res.status(200).json({ msg: "user create success fully", user: newUser, token })
  } catch (err) {
    res.status(500).json({ msg: "faild to create user", error: err.message })
  }
});

// login routes
router.post('/login', async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "plese inter all the input" })

    const isExist = await User.findOne({ email });
    if (!isExist) return res.status(500).json({ msg: "user not exist" })

    const comparePass = await bcrypt.compare(password, isExist.password)
    if (!comparePass) return res.status(404).json({ msg: "unathorised credentials " })

    const token = JWT.sign({ name: isExist.name, id: isExist._id, email: isExist.email }, SECRET_KEY, { expiresIn: "1d" })

    res.status(200).json({ msg: `You are Well come ${isExist.name}` })

  } catch (err) {
    res.status(500).json({ msg: "faild to create user", error: err.message })
  }
});


// add friend 
router.post('/add-friend', async (req, res) => {
  try {
    const { myEmail, friendEmail } = req.body;
    const me = await User.finOne({ email: myEmail });
    const friend = await User.findOne({ email: friendEmail });

    if (!friend) return res.status(404).json({ msg: 'No souch user exist' })

    // check if already firinds
    if (me.friends.includes(friend._id)) {
      return res.status(400).json({ msg: 'Already friends' });
    }

    me.friends.push(friend._id);
    await me.save();

    res.status(200).json({ msg: `you added ${friend.name} as a friend` })
  } catch (error) {
    res.status(500).json({ msg: 'Faild to add frined', error: error.message })
  }
});



// get friends

router.get('/friends/:email', async (req, res) => {
  const me = await User.findOne({ email: req.params.email }).populate('friends', 'name email');

  if (!me) return res.status(404).json({ msg: 'user not found' });

  res.status(200).json({ friends: me.friends })
})

export default router;