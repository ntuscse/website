import SeasonRepo from "../repo/seasonRepo";
import Season from "../model/season";
import Question from "../model/question";
import Submission from "../model/submission";
import User from "../model/user";
import mongoose from "mongoose";
import { submissionFixture } from "../utils/fixtures/submission";
import { userFixture } from "../utils/fixtures/fixtures";
import connectDB from "../config/db";

beforeAll(async () => {
    await connectDB();
    await Season.deleteMany({})
    await Question.deleteMany({})
    await Submission.deleteMany({})
    await User.deleteMany({})
})

afterAll(async () => {
    await Season.deleteMany({})
    await Question.deleteMany({})
    await Submission.deleteMany({})
    await User.deleteMany({})
    await mongoose.connection.close()
})

describe('calculateSeasonRankings', () => {
    afterEach(async () => {
        await Season.deleteMany({})
        await Question.deleteMany({})
        await Submission.deleteMany({})
        await User.deleteMany({})
    })

    it('should return all rankings', async () => {
        const seasonID = new mongoose.Types.ObjectId();
        const userID = new mongoose.Types.ObjectId();
        const name = "Hello";
        await Submission.create(submissionFixture({
            seasonID: seasonID,
            user: userID,
        }));
        await User.create(userFixture({
            _id: userID,
            name: name
        }));
        const rankings = await SeasonRepo.calculateSeasonRankings(seasonID);
        expect(rankings).toHaveLength(1);
        expect(rankings).toContainEqual({
            points: 10,
            user: {
                userID: userID,
                name: name
            }
        });
    })

    it('should return multiple users if there is multiple users', async () => {
        const seasonID = new mongoose.Types.ObjectId();
        const userID = new mongoose.Types.ObjectId();
        const userID2 = new mongoose.Types.ObjectId();
        const name = "Hello";
        const name2 = "Hello2";
        for (var i = 0; i < 6; i++) {
            await Submission.create(submissionFixture({
                seasonID: seasonID,
                user: userID,
            }));
        }
        for (var i = 0; i < 8; i++) {
            await Submission.create(submissionFixture({
                seasonID: seasonID,
                user: userID2,
            }));
        }
        await User.create(userFixture({
            _id: userID,
            name: name
        }));
        await User.create(userFixture({
            _id: userID2,
            name: name2
        }));
        const rankings = await SeasonRepo.calculateSeasonRankings(seasonID);
        expect(rankings).toHaveLength(2);
        expect(rankings).toContainEqual({
            points: 60,
            user: {
                userID: userID,
                name: name
            }
        });
        expect(rankings).toContainEqual({
            points: 80,
            user: {
                userID: userID2,
                name: name2
            }
        });
    })

    it('should return only the users that have submission (user with no submission should not be in leaderboard)', async () => {
        const seasonID = new mongoose.Types.ObjectId();
        const userID = new mongoose.Types.ObjectId();
        const userID2 = new mongoose.Types.ObjectId();
        const name = "Hello";
        const name2 = "Hello2";
        for (var i = 0; i < 8; i++){
            await Submission.create(submissionFixture({
                seasonID: seasonID,
                user: userID,
            }));
        }
        await User.create(userFixture({
            _id: userID,
            name: name
        }));
        await User.create(userFixture({
            _id: userID2,
            name: name2
        }));
        const rankings = await SeasonRepo.calculateSeasonRankings(seasonID);
        expect(rankings).toHaveLength(1);
        expect(rankings).toContainEqual({
            points: 80,
            user: {
                userID: userID,
                name: name
            }
        });
    })
})