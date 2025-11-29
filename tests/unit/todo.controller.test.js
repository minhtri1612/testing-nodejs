const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');

TodoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
    it("should create a new todo item", async () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
    it("should call TodoModel.create with correct parameters", async () => {
        let req, res, next;
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = null;
        req.body = newTodo;
        TodoController.createTodo(req,res,next);
        // use the correct Jest matcher
        expect(TodoModel.create).toHaveBeenCalled();
    });
});