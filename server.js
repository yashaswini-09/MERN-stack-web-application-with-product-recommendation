require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.post('/register', async (req, res) => {
  const { fullname, email, password, confirm_password } = req.body;

  // Log the user data to check if it is received
  console.log('User data received:', req.body);

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Hash password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Error during registration:', err); // Log any error
    res.status(500).json({ message: "Error saving user to database", error: err.message });
  }
});
