import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
const Question = require('../model/question');
const Submission = require('../model/submission');
const User = require('../model/user');
const Leaderboard = require('../model/leaderboard');
import { userFixture, questionFixture, answerFixture, leaderboardFixture } from '../utils/fixtures/fixtures';
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

describe('Set Submission: POST /api/submission/:id', () => {
    it('should not submit a question with invalid question id', async () => {
        const response = await request(app)
            .post('/api/submission')
            .send(answerFixture({ question: "123456789012" }));
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid question ID");
    });

    it('should not submit a question with non existing question id', async () => {
        const response = await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: "65a8ba0b8c8139544b9955ac"}));
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Question not found");
    })

    it('should not submit a question with inactive question', async () => {
        const question = await Question.create(questionFixture({ active: false }));
        const response = await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id }));
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Question is not active");
    })

    it('should not submit a question with expired question', async () => {
        const question = await Question.create(questionFixture({ expiry: "2021-06-01T00:00:00.000Z" }));
        const response = await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id}));
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Question has expired");
    })

    it('should submit an incorrect answer', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture({ answer: "answer", points: 12}));
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "incorrect answer", user: user._id, leaderboard: leaderboard._id}));
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Answer submitted");

        // Submission should be created
        const submission = await Submission.findOne({ question: question._id, user: user._id }).populate('user');
        expect(submission.answer).toBe("incorrect answer");
        expect(submission.correct).toBe(false);
        expect(submission.points_awarded).toBe(0);
        expect(submission.user.name).toBe(user.name);

        // Question should have the submission in submissions array
        const updatedQuestion = await Question.findOne({ _id: question._id });
        expect(updatedQuestion.submissions.length).toBe(1);
        expect(updatedQuestion.submissions[0]).toEqual(submission._id);

        // Question should have the submission count incremented
        expect(updatedQuestion.submissions_count).toBe(1);
        expect(updatedQuestion.correct_submissions_count).toBe(0);

        // Leaderboard should have the user in rankings array
        const updatedLeaderboard = await Leaderboard.findOne({ _id: leaderboard._id });
        expect(updatedLeaderboard.rankings.length).toBe(1);
        expect(updatedLeaderboard.rankings[0].user).toEqual(user._id);
        expect(updatedLeaderboard.rankings[0].points).toEqual(0);
    })

    it('should submit an answer', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture({ answer: "answer", points: 11}));
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Answer submitted");

        // Submission should be created
        const submission = await Submission.findOne({ question: question._id }).populate('user');
        expect(submission.answer).toBe("answer");
        expect(submission.correct).toBe(true);
        expect(submission.points_awarded).toBe(11);
        expect(submission.user.name).toBe(user.name);

        // Question should have the submission in submissions array
        const updatedQuestion = await Question.findOne({ _id: question._id });
        expect(updatedQuestion.submissions.length).toBe(1);
        expect(updatedQuestion.submissions[0]).toEqual(submission._id);

        // Question should have the submission count incremented
        expect(updatedQuestion.submissions_count).toBe(1);
        expect(updatedQuestion.correct_submissions_count).toBe(1);
    })

    it('should submit an correct answer and update leaderboard', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture({ answer: "answer", points: 11}));
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Answer submitted");

        // Leaderboard should have the user in rankings array
        const updatedLeaderboard = await Leaderboard.findOne({ _id: leaderboard._id });
        expect(updatedLeaderboard.rankings.length).toBe(1);
        expect(updatedLeaderboard.rankings[0].user).toEqual(user._id);
        expect(updatedLeaderboard.rankings[0].points).toEqual(11);
    })

    it('should submit an answer and ranking points should not stack even with multiple correct submissions', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture({ answer: "answer", points: 11}));
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));

        const updatedLeaderboard = await Leaderboard.findOne({ _id: leaderboard._id });
        expect(updatedLeaderboard.rankings.length).toBe(1);
        expect(updatedLeaderboard.rankings[0].user).toEqual(user._id);
        expect(updatedLeaderboard.rankings[0].points).toEqual(11);
    })

    it('should submit an answer and ranking points should stack with multiple correct submissions for different questions', async () => {
        const user = await User.create(userFixture());
        const question1 = await Question.create(questionFixture({ answer: "answer", points: 34}));
        const question2 = await Question.create(questionFixture({ answer: "answer", points: 35}));
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question1._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question2._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));

        const updatedLeaderboard = await Leaderboard.findOne({ _id: leaderboard._id });
        expect(updatedLeaderboard.rankings.length).toBe(1);
        expect(updatedLeaderboard.rankings[0].user).toEqual(user._id);
        expect(updatedLeaderboard.rankings[0].points).toEqual(69);
    })

    it('should submit an answer and get ranking points if the previous submission was incorrect', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture({ answer: "answer", points: 11}));
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "incorrect answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "incorrect answer2", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));

        const updatedLeaderboard = await Leaderboard.findOne({ _id: leaderboard._id });
        expect(updatedLeaderboard.rankings.length).toBe(1);
        expect(updatedLeaderboard.rankings[0].user).toEqual(user._id);
        expect(updatedLeaderboard.rankings[0].points).toEqual(11);
    })

    it('should submit an answer and get ranking points if the previous submission was incorrect and the new submission is correct', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture({ answer: "answer", points: 11}));
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "incorrect answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "incorrect answer2", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/submission`)
            .send(answerFixture({ question: question._id, answer: "answer", user: user._id, leaderboard: leaderboard._id }));

        const updatedLeaderboard = await Leaderboard.findOne({ _id: leaderboard._id });
        expect(updatedLeaderboard.rankings.length).toBe(1);
        expect(updatedLeaderboard.rankings[0].user).toEqual(user._id);
        expect(updatedLeaderboard.rankings[0].points).toEqual(11);
    })
})


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