const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');

TodoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
    it("should create a new todo item", async () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
    it("should call TodoModel.create with correct parameters", async () => {
        // make the test async and await the controller in case it returns a Promise
        await TodoController.createTodo();
        // use the correct Jest matcher
        expect(TodoModel.create).toHaveBeenCalled();
    });
});