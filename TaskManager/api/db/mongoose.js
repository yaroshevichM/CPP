const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://yaroshevichM:87654321@cluster0-azp88.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('connected to db success')
}).catch((e) => console.log("Connected to db failed", e))

module.exports = {
    mongoose
}