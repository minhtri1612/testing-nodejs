const request = require("supertest");
const newTodo = require("../mock-data/new-todo.json");

// Mock the TodoModel before loading the app/routes so controller uses the mock
jest.mock("../../model/todo.model");
const TodoModel = require("../../model/todo.model");
const app = require("../../app");
const Test = require("supertest/lib/test");

const endpointUrl = "/todos/";

describe(endpointUrl, () => {
    beforeEach(() => {
        // ensure GET /todos returns an array
        TodoModel.find.mockResolvedValue([newTodo]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    // --- START FIX: Removed duplicate test line and moved the closing brace ---
    test("GET " + endpointUrl, async () => {
         const response = await request(app).get(endpointUrl);
 
         expect(response.statusCode).toBe(200);
         expect(Array.isArray(response.body)).toBeTruthy();
         expect(response.body[0].title).toBeDefined();
         expect(response.body[0].done).toBeDefined();
 
     });
    // --- END FIX ---

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