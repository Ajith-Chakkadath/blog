const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
