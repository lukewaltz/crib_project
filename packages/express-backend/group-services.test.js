import mongoose from "mongoose";
import groupServices from "./group-services.js";
import Group from "./group.js";

describe("groupServices", () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect(
            "mongodb://localhost:27017/test-group-database",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    afterEach(async () => {
        await Group.deleteMany({});
    });

    describe("findGroupByName", () => {
        it("should find a group by name", async () => {
            const testGroup = {
                owner: new mongoose.Types.ObjectId(),
                name: "Test Group",
                code: "uniquecode",
                members: [new mongoose.Types.ObjectId()],
            };
            await Group.create(testGroup);

            const result = await groupServices.findGroupByName("Test Group");

            expect(result).not.toBeNull();
            expect(result.name).toBe("Test Group");
            expect(result.code).toBe("uniquecode");
        });

        it("should return undefined for non-existent group name", async () => {
            const result = await groupServices.findGroupByName(
                "Non-Existent Group"
            );

            expect(result).toBeNull();
        });

        it("should handle errors and return undefined", async () => {
            const result = await groupServices.findGroupByName("invalid-group");

            expect(result).toBeNull();
        });
    });

    describe("addGroup", () => {
        it("should add a group", async () => {
            const testGroup = {
                owner: new mongoose.Types.ObjectId(),
                name: "Test Group",
                code: "uniquecode",
                members: [new mongoose.Types.ObjectId()],
            };
            const result = await groupServices.addGroup(testGroup);

            expect(result).not.toBeNull();
            expect(result.name).toBe("Test Group");
            expect(result.code).toBe("uniquecode");
        });

        it("should handle errors and return 500", async () => {
            const testGroup = {
                owner: new mongoose.Types.ObjectId(),
                // missing 'name' property
            };
            const result = await groupServices.addGroup(testGroup);

            expect(result).toBe(500);
        });
    });

    describe("addUserToGroup", () => {
        it("should add a user to a group", async () => {
            const testGroup = await Group.create({
                owner: new mongoose.Types.ObjectId(),
                name: "Test Group",
                code: "uniquecode",
                members: [],
            });

            const testUser = new mongoose.Types.ObjectId();
            const result = await groupServices.addUserToGroup(
                testGroup.code,
                testUser
            );

            await Group.findOne({ code: "uniquecode" }).then((group) => {
                expect(group.members).toContainEqual(testUser);
            });

            expect(result).not.toBeNull();
        });

        it("should return null for non-existent group code", async () => {
            const testUser = new mongoose.Types.ObjectId();
            const result = await groupServices.addUserToGroup(
                "non-existent-code",
                testUser
            );

            expect(result).toBeNull();
        });

        it("should handle errors and return null", async () => {
            const testUser = new mongoose.Types.ObjectId();
            const result = await groupServices.addUserToGroup(
                "invalid-code",
                testUser
            );

            expect(result).toBeNull();
        });
    });
});
