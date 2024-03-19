const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://wazfni.onrender.com:27017/LoginSystem');

connect.then(()  => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.log(`Error: ${err}`);
});

const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model('users', Loginschema);

module.exports = collection;
