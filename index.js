const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB using mongoose API
// mongoose.connect uses the URI in .env to connect to the correct database (sample_training), the .catch will catch all initial connection errors
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => console.error.bind(console));
// Binds all errors after intial connection to console
mongoose.connection.on("err", console.error.bind(console));

// Middlware:
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use(express.static(path.join(__dirname, "client/build")));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use('/api', routes)

app.use((err, req, res, next) => {
    console.log("midware app.use((err,req,res,next) error: " + err);
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});