const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');

TodoModel.create = jest.fn();
let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("TodoController.createTodo", () => {

    beforeEach(() => {
        req.body = newTodo;
    });

    it("should create a new todo item", async () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
    it("should call TodoModel.create with correct parameters", async () => {
        await TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toHaveBeenCalledWith(req.body);
    });
    it("should return 201 status code", async () => {
        req.body = newTodo;
        // make the model return a resolved value so controller can finish
        TodoModel.create.mockResolvedValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body", async () => {
        TodoModel.create.mockResolvedValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
});