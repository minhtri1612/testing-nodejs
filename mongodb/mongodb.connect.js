// ...existing code...
const mongoose = require('mongoose');

async function connect() {
    try{
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/todo-tdd"
        );
    }
    catch(err){
        console.error("Failed to connect to MongoDB", err);
    }
}

// ...existing code...
module.exports = { connect, mongoose };