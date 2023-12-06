import mongoose from "mongoose";
import Task from "./task.js";
import mut from "./task-services.js";

describe("findTask", () => {
    // formatting functions to setup database for each test
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect("mongodb://localhost:27017/test-task-database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    beforeEach(async () => {
        await Task.create({
            task: "Test Task",
            dueDate: "2023-12-31",
            weight: 5,
            assignee: "John Doe",
        });
    });
    afterEach(async () => {
        await Task.deleteMany({});
    });

    // tests
    it("should find a task by ID", async () => {
        const testTask = await Task.findOne({ task: "Test Task" });
        const taskId = testTask._id.toString();

        const result = await mut.findTask(taskId);

        expect(result).not.toBeNull();
        expect(result.task).toBe("Test Task");
        expect(result.dueDate).toBe("2023-12-31");
        expect(result.weight).toBe(5);
        expect(result.assignee).toBe("John Doe");
    });
    it("should return null for non-existent task ID", async () => {
        const result = await mut.findTask("656e68c43437b8649d0e62db");

        expect(result).toBeNull();
    });
    it("should handle errors and throw an error", async () => {
        await expect(mut.findTask("invalid-id")).rejects.toThrow();
    });
});

describe("getTasks", () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect("mongodb://localhost:27017/test-task-database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    beforeEach(async () => {
        await Task.create({
            task: "Test Task",
            dueDate: "2023-12-31",
            weight: 5,
            assignee: "John Doe",
        });
    });
    afterEach(async () => {
        await Task.deleteMany({});
    });

    it("should return the current tasks", async () => {
        const tasks = mut.getTasks();
        expect(tasks).not.toBeNull();
    });
});

describe("addTask", () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect("mongodb://localhost:27017/test-task-database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    afterEach(async () => {
        await Task.deleteMany({});
    });

    it("should add the task", async () => {
        const task = {
            task: "Test Task",
            dueDate: "2023-12-31",
            weight: 5,
            assignee: "John Doe",
        };
        const result = await mut.addTask(task);
        console.log(result);
        expect(result).not.toBeNull;
    });
    it("should throw an error", async () => {
        const task = {
            user: "John",
        };
        const result = await mut.addTask(task);
        expect(result).tobeNull;
    });
});

describe("deleteTask", () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect("mongodb://localhost:27017/test-task-database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    beforeEach(async () => {
        await Task.create({
            task: "Test Task",
            dueDate: "2023-12-31",
            weight: 5,
            assignee: "John Doe",
        });
    });
    afterEach(async () => {
        await Task.deleteMany({});
    });

    it("should delete the task", async () => {
        const testTask = await Task.findOne({ task: "Test Task" });
        const taskId = testTask._id.toString();

        await mut.deleteTask(taskId);

        const deletedTask = await Task.findById(taskId);
        expect(deletedTask).toBeNull();
    });
    it("should throw an error", async () => {
        await expect(mut.deleteTask("invalid-id")).rejects.toThrow();
    });
});
