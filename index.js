const express = require('express');
const mongoose = require('mongoose'); 

const router = require('./router');
require("dotenv").config(); 

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json()); 

app.use("/itemDetails", router);

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

mongoose.connect(process.env.MongoDB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});