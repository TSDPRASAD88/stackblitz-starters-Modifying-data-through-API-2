const express = require('express');
const { resolve } = require('path');
const dotenv = require("dotenv").config();
const MenuItem = require("./schema");
const mongoose=require("mongoose");

const app = express();
const port = 3010;
 
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, async () => {
  await mongoose.connect(process.env.MongoDB_URL);
  console.log(`Example app listening at http://localhost:${port}`);
});
