const TodoController = require('../../controllers/todo.controller');

describe("TodoController.createTodo", () => {
    it("should create a new todo item", async () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
});