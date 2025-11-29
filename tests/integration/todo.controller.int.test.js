const request = require("supertest");
const newTodo = require("../mock-data/new-todo.json");

// Mock the TodoModel before loading the app/routes so controller uses the mock
jest.mock("../../model/todo.model");
const TodoModel = require("../../model/todo.model");
const app = require("../../app");

const endpointUrl = "/todos/";

describe(endpointUrl, () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("POST " + endpointUrl, async () => {
        // Make the model create resolve quickly to avoid DB calls/timeouts
        TodoModel.create.mockResolvedValue(newTodo);

        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
    });

    it("should return 500 if there is a server error " + endpointUrl, async () => {
        // simulate model/database error
        TodoModel.create.mockRejectedValue(new Error("DB failure"));

        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);

        expect(response.statusCode).toBe(500);
        expect(response.body).toBeDefined();
        // match the error thrown by the mocked model
        expect(response.body).toStrictEqual({ message: "DB failure" });
    });
});