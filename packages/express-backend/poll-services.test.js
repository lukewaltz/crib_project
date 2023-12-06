import mongoose from "mongoose";
import pollServices from "./poll-services.js";
import Poll from "./pollSchema.js";

describe("pollServices", () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect("mongodb://localhost:27017/test-poll-database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    afterEach(async () => {
        await Poll.deleteMany({});
    });

    describe("findPoll", () => {
        it("should find a poll by title", async () => {
            const testPoll = new Poll({
                title: "Test Poll",
                option1: "Option A",
                option2: "Option B",
            });
            await testPoll.save();

            const result = await pollServices.findPoll(testPoll._id.toString());

            expect(result).not.toBeNull();
            expect(result.title).toBe("Test Poll");
            expect(result.option1).toBe("Option A");
            expect(result.option2).toBe("Option B");
        });

        it("should handle errors and throw an error", async () => {
            await expect(pollServices.findPoll("invalid-id")).rejects.toThrow();
        });
    });

    describe("getPolls", () => {
        it("should return an array of polls", async () => {
            await Poll.create({
                title: "Test Poll 1",
                option1: "Option A",
                option2: "Option B",
            });

            await Poll.create({
                title: "Test Poll 2",
                option1: "Option X",
                option2: "Option Y",
            });

            const polls = await pollServices.getPolls();

            expect(polls).toHaveLength(2);
        });
    });

    describe("addPoll", () => {
        it("should add a poll", async () => {
            const testPoll = {
                title: "New Test Poll",
                option1: "Option A",
                option2: "Option B",
            };
            const result = await pollServices.addPoll(testPoll);

            expect(result).not.toBeNull();
            expect(result.title).toBe("New Test Poll");
            expect(result.option1).toBe("Option A");
            expect(result.option2).toBe("Option B");
        });

        it("should handle errors and return 500", async () => {
            const testPoll = {
                option1: "Option A",
                option2: "Option B",
            };
            const result = await pollServices.addPoll(testPoll);

            expect(result).toBe(500);
        });
    });

    describe("deletePoll", () => {
        it("should delete a poll", async () => {
            const testPoll = new Poll({
                title: "Test Poll",
                option1: "Option A",
                option2: "Option B",
            });
            await testPoll.save();

            await pollServices.deletePoll(testPoll._id.toString());

            const deletedPoll = await Poll.findById(testPoll._id);
            expect(deletedPoll).toBeNull();
        });

        it("should return undefined for non-existent poll ID", async () => {
            const result = await pollServices.deletePoll("non-existent-id");

            expect(result).toBeUndefined();
        });
    });

    describe("voteForOption", () => {
        it("should record a vote for an option", async () => {
            const testPoll = new Poll({
                title: "Test Poll",
                option1: "Option A",
                option2: "Option B",
            });
            await testPoll.save();

            const result = await pollServices.voteForOption(
                testPoll._id.toString(),
                "Option A"
            );

            expect(result.success).toBe(true);
            expect(result.message).toBe(
                "Vote for Option A recorded successfully"
            );
        });

        it("should handle non-existent poll and return false", async () => {
            const result = await pollServices.voteForOption(
                "non-existent-id",
                "Option A"
            );

            expect(result.success).toBe(false);
        });

        it("should handle errors and return false", async () => {
            const result = await pollServices.voteForOption(
                "invalid-id",
                "Option A"
            );

            expect(result.success).toBe(false);
            expect(result.message).toContain("Error recording vote");
        });
    });
});
