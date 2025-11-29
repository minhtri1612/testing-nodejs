const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todo.json');
const { all } = require('../../app');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();



let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});



describe("TodoController.getTodoById", () => {
  it("should have a getTodoById", () => {
    expect(typeof TodoController.getTodoById).toBe("function");
  });
  it("should call TodoModel.findById with route parameters", async () => {
    req.params.todoId = "5d5ecb5a6e598605f06cb945";
    await TodoController.getTodoById(req, res, next);
    expect(TodoModel.findById).toBeCalledWith("5d5ecb5a6e598605f06cb945");
  });
  it("should return json body and response code 200", async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should do error handling", async () => {
    const errorMessage = { message: "error finding todoModel" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findById.mockReturnValue(rejectedPromise);
    await TodoController.getTodoById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});


// ...existing code...
describe("TodoController.getTodos", () => {
    TodoModel.find.mockReturnValue(allTodos);
    beforeEach(() => {
        // mock as resolved value because controller awaits the call
        TodoModel.find.mockResolvedValue(allTodos);
    });
    it("should be a function", () => {
        expect(typeof TodoController.getTodos).toBe("function");
    });
    it("should call TodoModel.find", async () => {
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });
    it("should return 200 response code", async () => {
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });
    it("should handle errors in getTodos", async () => {
        const errorMessage = { message: "Error finding todos" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
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
        await TodoModel.create.mockResolvedValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body", async () => {
        TodoModel.create.mockResolvedValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});