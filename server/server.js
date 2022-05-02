const express = require('express')
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8888;
const postsRouter = require('./routers/posts.router');
require('dotenv').config();
const URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(postsRouter)

mongoose.connect(URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
    .then(() => {
      console.log("You are now connected to your database!");
    })
    .catch((error) => {
      console.error(error);
    });
    app.listen(PORT, () => {
        console.log(`This server is running on http://localhost:${PORT}`)
  });
  