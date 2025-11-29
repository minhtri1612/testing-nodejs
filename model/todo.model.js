const monogoose = require('mongoose');

const todoSchema = new monogoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

const TodoModel = monogoose.model('Todo', todoSchema);

module.exports = TodoModel;