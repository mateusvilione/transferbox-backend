const mongoose = require('mongoose');

mongoose.connect(
    process.env.STR_CONNECTION_DB,
    { useNewUrlParser: true }
);

module.exports = mongoose;