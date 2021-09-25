const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require("path");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB using mongoose API
// mongoose.connect uses the URI in .env to connect to the correct database (sample_training), the .catch will catch all initial connection errors
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("connected to MongoDB successfully"))
  .catch(error => console.error.bind(console));
// Binds all errors after intial connection to console
mongoose.connection.on("err", console.error.bind(console));

//mongoose's promise is deprecated
mongoose.Promise = global.Promise;

//close mongoose
function close(){
  mongoose.connection.close();
  console.log("mongoose closed")
}

// Middleware: 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use(express.static(path.join(__dirname, "client/build")));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api', routes)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
    
app.use((err, req, res, next) => {
    console.log("midware app.use((err,req,res,next) error: " + err);
});

let server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports.server = server;
module.exports.close = close;