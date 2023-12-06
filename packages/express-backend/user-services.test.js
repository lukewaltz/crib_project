import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userServices from "./user-services.js";
import User from "./user.js";
import Group from "./group.js";
import Task from "./task.js";

describe("userServices", () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect("mongodb://localhost:27017/test-user-database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    describe("addToGroup", () => {
        it("should add a user to a group", async () => {
            const testUser = await User.create({
                username: "JohnDoe",
                email: "john.doe@example.com",
                name: "John Doe",
                password: "securepassword",
            });

            const testGroup = await Group.create({
                owner: new mongoose.Types.ObjectId(),
                name: "Test Group again",
                members: [],
            });

            const result = await userServices.addToGroup(
                testUser.username,
                testGroup
            );

            const updatedUser = await User.findOne({
                username: "JohnDoe",
            }).populate("group");

            expect(result).not.toBeNull();
            expect(result).not.toBe(500);
            expect(updatedUser.group.name).toBe("Test Group again");
        });

        it("should handle errors and return null for non-existent user", async () => {
            const testGroup = await Group.create({
                owner: new mongoose.Types.ObjectId(),
                name: "Test Group",
                members: [],
            });

            const result = await userServices.addToGroup(
                "NonExistentUser",
                testGroup
            );

            expect(result).toBeNull();
        });

        it("should handle errors and return 500 for non-existent group", async () => {
            const testUser = await User.create({
                username: "JohnDoe",
                email: "john.doe@example.com",
                name: "John Doe",
                password: "securepassword",
            });

            const result = await userServices.addToGroup(
                testUser.username,
                "NonExistentGroup"
            );

            expect(result).toBe(500);
        });
    });

    describe("findUserByUsername", () => {
        it("should find a user by username", async () => {
            const testUser = await User.create({
                username: "JohnDoe",
                email: "john.doe@example.com",
                name: "John Doe",
                password: "securepassword",
            });

            const result = await userServices.findUserByUsername("JohnDoe");

            expect(result).not.toBeNull();
            expect(result.username).toBe("JohnDoe");
        });

        it("should return undefined for non-existent username", async () => {
            const result = await userServices.findUserByUsername(
                "NonExistentUser"
            );

            expect(result).toBeNull();
        });

        it("should handle errors and return undefined", async () => {
            const result = await userServices.findUserByUsername(
                "invalid-username"
            );

            expect(result).toBeNull();
        });
    });

    describe("findUserByEmail", () => {
        it("should find a user by username", async () => {
            const testUser = await User.create({
                username: "JohnDoe",
                email: "john.doe@example.com",
                name: "John Doe",
                password: "securepassword",
            });

            const result = await userServices.findUserByEmail(
                "john.doe@example.com"
            );

            expect(result).not.toBeNull();
            expect(result.username).toBe("JohnDoe");
        });

        it("should return undefined for non-existent username", async () => {
            const result = await userServices.findUserByUsername(
                "NonExistentUser"
            );

            expect(result).toBeNull();
        });

        it("should handle errors and return undefined", async () => {
            // Intentionally create an error by passing an invalid username
            const result = await userServices.findUserByUsername(
                "invalid-username"
            );

            expect(result).toBeNull();
        });
    });

    describe("getUsers", () => {
        it("should find users by username", async () => {
            const testUser = {
                username: "JohnDoe",
                email: "john.doe@example.com",
                name: "John Doe",
                password: "password",
            };
            await User.create(testUser);

            const result = await userServices.getUsers("JohnDoe", null, null);

            expect(result.email).toBe("john.doe@example.com");
        });

        it("should find users by email", async () => {
            const testUser = {
                username: "JohnDoe",
                email: "john.doe@example.com",
                name: "John Doe",
                password: "password",
            };
            await User.create(testUser);

            const result = await userServices.getUsers(
                null,
                "john.doe@example.com",
                null
            );

            expect(result.email).toBe("john.doe@example.com");
        });

        it("should return all users when no filter is provided", async () => {
            const testUser = {
                username: "User1",
                email: "user1@example.com",
                name: "User One",
                password: "password1",
            };

            await User.create([testUser]);

            const result = await userServices.getUsers(null, null, null);

            expect(result).toHaveLength(1);
        });

        it("should handle errors and return undefined", async () => {
            const result = await userServices.getUsers(
                "nonexistent",
                null,
                null
            );

            expect(result).toBeNull();
        });
    });

    describe("randomUser", () => {
        it("should return a random user", async () => {
            const testUsers = [
                {
                    username: "User1",
                    email: "user1@example.com",
                    name: "User One",
                    password: "password1",
                    group: new mongoose.Types.ObjectId(),
                },
                {
                    username: "User2",
                    email: "user2@example.com",
                    name: "User Two",
                    password: "password2",
                    group: new mongoose.Types.ObjectId(),
                },
            ];

            await User.create(testUsers);

            const result = await userServices.randomUser();

            expect(result).not.toBeNull();
        });
    });

    describe("addUser", () => {
        it("should add a user with hashed password", async () => {
            const userToAdd = {
                username: "JohnDoe",
                email: "john.doe@example.com",
                name: "John Doe",
                password: "testpassword",
            };

            const result = await userServices.addUser(userToAdd);

            expect(result).not.toBeNull();
            expect(result.username).toBe("JohnDoe");

            const storedUser = await User.findOne({ username: "JohnDoe" });
            expect(storedUser).not.toBeNull();
            expect(
                bcrypt.compareSync("testpassword", storedUser.password)
            ).toBe(true);
        });

        it("should handle errors and return 500", async () => {
            const userToAdd = {
                // missing 'password' property
                username: "JohnDoe",
                email: "john.doe@example.com",
                name: "John Doe",
            };

            const result = await userServices.addUser(userToAdd);

            expect(result).toBe(500);
        });
    });

    describe("addTask", () => {
        let testUser;

        beforeAll(async () => {
            testUser = {
                username: "TestUser",
                email: "testuser@example.com",
                name: "Test User",
                password: "password",
                tasks: [],
            };
            await User.create(testUser);
            await Task.deleteMany({});
        });

        afterAll(async () => {
            await User.deleteOne({ username: testUser.username });
        });

        afterEach(async () => {
            await Task.deleteMany({});
        });

        it("should add a task to a user", async () => {
            const newTask = await Task.create({
                task: "Test Task 26543",
                dueDate: "2023-12-31",
                weight: 5,
            });

            await userServices.addTask(testUser.username, newTask);

            const updatedUser = await User.findOne({
                username: testUser.username,
            });

            const addedTask = updatedUser.tasks.find(
                (task) => task.task === newTask.task
            );
            expect(addedTask).not.toBeNull();
        });
    });

    describe("removeTask", () => {
        let testUser;
        let testTaskId;

        beforeAll(async () => {
            // Create a test user without tasks initially
            testUser = {
                username: "TestUser",
                email: "testuser@example.com",
                name: "Test User",
                password: "password",
            };
            const createdUser = await User.create(testUser);

            // Add a task to the user
            const createdTask = await Task.create({
                task: "Test Task",
                dueDate: "2023-12-31",
                weight: 5,
                assignee: createdUser.username,
            });
            testTaskId = createdTask._id;

            await User.findOneAndUpdate(
                { username: testUser.username },
                { $push: { tasks: createdTask._id } }
            );
        });

        it("should remove a task from a user", async () => {
            // Call the removeTask function
            await userServices.removeTask(testUser.username, testTaskId);

            // Retrieve the updated user
            const updatedUser = await User.findOne({
                username: testUser.username,
            });

            // Check if the task has been removed
            const removedTask = updatedUser.tasks.find(
                (task) => task.toString() === testTaskId.toString()
            );
            expect(removedTask).toBeUndefined();
        });

        afterAll(async () => {
            // Clean up: remove the test user and task
            await User.deleteOne({ username: testUser.username });
            await Task.deleteOne({ _id: testTaskId });
        });
    });

    describe("deleteUser", () => {
        let testUserId;

        beforeAll(async () => {
            // Create a test user
            const testUser = {
                username: "ToDelete",
                email: "todelete@example.com",
                name: "To Delete",
                password: "password",
            };
            const createdUser = await User.create(testUser);
            testUserId = createdUser._id;
        });

        it("should delete a user", async () => {
            // Call the deleteUser function
            await userServices.deleteUser(testUserId);

            // Attempt to find the deleted user
            const deletedUser = await User.findById(testUserId);

            // Expect the deleted user to be null
            expect(deletedUser).toBeNull();
        });

        it("should handle errors and return undefined for non-existent user", async () => {
            // Attempt to delete a non-existent user
            const result = await userServices.deleteUser("nonexistentid");

            // Expect the result to be undefined
            expect(result).toBeUndefined();
        });

        afterAll(async () => {
            // Clean up: remove the test user (if not already deleted)
            await User.findByIdAndDelete(testUserId).exec();
        });
    });
});
