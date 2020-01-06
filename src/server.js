const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('./config/mongoConnection');
const routes = require('./routes');
const path = require("path");
const port = process.env.PORT;
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require("cors");

const app = express();
app.use(cors());

io.on('connection', socket => {
    socket.on('conectRoom', box => {
        socket.join(box);
    })
})

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);
app.use("/files", express.static(path.resolve(__dirname, '..', 'tmp')));

server.listen(port, () => {
    console.log("* Servidor iniciado na porta " + port + ".");
});