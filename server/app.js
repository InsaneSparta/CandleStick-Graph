const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const btcusdRouter = require('./routes/btcusd.routes');
const eurusdRouter = require('./routes/eurusd.routes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["https://candle-stick-graph-vkfp.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const uri = 'mongodb+srv://Sarthak:Sarthak@cluster0.tyeesq6.mongodb.net/MyDatabase';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API' });
});
app.use('/btcusd', btcusdRouter);
app.use('/eurusd', eurusdRouter);

// Catch-all route
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested route '${req.path}' does not exist.`,
    method: req.method,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
