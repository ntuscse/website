import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
const Question = require('../model/question');
const Submission = require('../model/submission');
const User = require('../model/user');
const Leaderboard = require('../model/leaderboard');
import { userFixture, questionFixture, answerFixture, leaderboardFixture } from '../utils/fixtures';
import { isValidObjectId } from '../utils/db';

beforeAll(async () => {
    await Leaderboard.deleteMany({})
    await Question.deleteMany({})
    await Submission.deleteMany({})
    await User.deleteMany({})
})
  
afterAll(async () => {
    await Leaderboard.deleteMany({})
    await Question.deleteMany({})
    await Submission.deleteMany({})
    await User.deleteMany({})
    await mongoose.connection.close()
})

describe('List Submissions: GET /api/submission', () => {
    it('should not get submissions with invalid submission id', async () => {
        const response = await request(app).get('/api/submission/123456789012');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid submission ID");
    })

    it('should not get submissions with non existing submission id', async () => {
        const response = await request(app).get(`/api/submission/65a8ba0b8c8139544b9955ac`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Submission not found");
    })

    it('should return all submissions', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture());
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        await Submission.create(answerFixture({user: user._id, question: question._id, leaderboard: leaderboard._id}));
        await Submission.create(answerFixture({user: user._id, question: question._id, leaderboard: leaderboard._id}));
        const response = await request(app).get('/api/submission');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    })
})

describe('Get Submissions: GET /api/submissions/:id', () => {
    it('should not get a submission with invalid submission id', async () => {
        const response = await request(app).get('/api/submission/123456789012');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid submission ID");
    })

    it('should not get a submission with non existing submission id', async () => {
        const response = await request(app).get(`/api/submission/65a8ba0b8c8139544b9955ac`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Submission not found");
    })

    it('should return a submission', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture());
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const submission = await Submission.create(answerFixture({user: user._id, question: question._id, leaderboard: leaderboard._id}));
        const response = await request(app).get(`/api/submission/${submission._id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(submission._id.toString());
        expect(response.body.user).toBe(submission.user.toString());
    })
})

// Set Submissions: Refer to questionair.test.ts

describe('Update Submissions: PUT /api/submissions/:id', () => {
    it('should not update a submission with invalid submission id', async () => {
        const response = await request(app).put('/api/submission/123456789012');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid submission ID");
    })

    it('should not update a submission with non existing submission id', async () => {
        const response = await request(app).put(`/api/submission/65a8ba0b8c8139544b9955ac`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Submission not found");
    })

    it('should update a submission', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture());
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const submission = await Submission.create(answerFixture({user: user._id, question: question._id, leaderboard: leaderboard._id}));
        const response = await request(app).put(`/api/submission/${submission._id}`).send({answer: "new answer"});
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(submission._id.toString());
        expect(response.body.answer).toBe("new answer");
    })
})

describe('Delete Submissions: DELETE /api/submissions/:id', () => {
    it('should not delete a submission with invalid submission id', async () => {
        const response = await request(app).delete('/api/submission/123456789012');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid submission ID");
    })

    it('should not delete a submission with non existing submission id', async () => {
        const response = await request(app).delete(`/api/submission/65a8ba0b8c8139544b9955ac`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Submission not found");
    })

    it('should delete a submission', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture());
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const submission = await Submission.create(answerFixture({user: user._id, question: question._id, leaderboard: leaderboard._id}));
        const response = await request(app).delete(`/api/submission/${submission._id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Submission deleted");
        expect(await Submission.findById(submission._id)).toBe(null);
    })
})