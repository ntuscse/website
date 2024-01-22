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

describe('List Questions: GET /api/question', () => {
    beforeAll(async () => {
        await Question.deleteMany({});
        await Question.create(questionFixture());
        await Question.create(questionFixture());
        await Question.create(questionFixture({ active: false }));
    });

    it('should return all questions', async () => {
        const response = await request(app).get('/api/question');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });

    it('should return only active questions', async () => {
        const response = await request(app).get('/api/question/active');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
})

describe('Get Questions: GET /api/question/:id', () => {
    it('should not get a question with invalid question id', async () => {
        const response = await request(app).get('/api/question/123456789012');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid question ID");
    })

    it('should not get a question with non existing question id', async () => {
        const response = await request(app).get(`/api/question/65a8ba0b8c8139544b9955ac`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Question not found");
    })

    it('should get a question', async () => {
        const question = await Question.create(questionFixture());
        const response = await request(app).get(`/api/question/${question._id}`);
        expect(response.status).toBe(200);
        expect(response.body.question_no).toBe(question.question_no);
        expect(response.body.question_title).toBe(question.question_title);
        expect(response.body.question_desc).toBe(question.question_desc);
        expect(new Date(response.body.question_date)).toEqual(new Date(question.question_date));
        expect(new Date(response.body.expiry)).toEqual(new Date(question.expiry));
        expect(response.body.points).toBe(question.points);
        expect(response.body.answer).toBe(question.answer);
    })
});

describe('Create Questions: POST /api/question', () => {
    it('should not create a question with missing fields', async () => {
        const response = await request(app)
            .post('/api/question')
            .send(questionFixture({ question_no: null }));
        expect(response.status).toBe(400);
    });

    it('should create a question', async () => {
        const question = questionFixture();
        const response = await request(app)
            .post('/api/question')
            .send(question);
        expect(response.status).toBe(201);
        expect(response.body.question_no).toBe(question.question_no);
        expect(response.body.question_title).toBe(question.question_title);
        expect(response.body.question_desc).toBe(question.question_desc);
        expect(response.body.question_date).toBe(question.question_date);
        expect(response.body.expiry).toBe(question.expiry);
        expect(response.body.points).toBe(question.points);
        expect(response.body.answer).toBe(question.answer);
        expect(response.body.active).toBe(question.active);
    });
})

describe('Update Questions: PUT /api/question/:id', () => {
    it('should not update a question with invalid question id', async () => {
        const response = await request(app)
            .put('/api/question/123456789012')
            .send({ question_no: "updated question_no", question_title: "updated question_title", question_desc: "updated question_desc", question_date: "2024-05-01T00:00:00.000Z", expiry: "2024-06-01T00:00:00.000Z", points: 11, answer: "updated answer" });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid question ID");
    });

    it('should not update a question with non existing question id', async () => {
        const response = await request(app)
            .put(`/api/question/65a8ba0b8c8139544b9955ac`)
            .send({ question_no: "updated question_no", question_title: "updated question_title", question_desc: "updated question_desc", question_date: "2024-05-01T00:00:00.000Z", expiry: "2024-06-01T00:00:00.000Z", points: 11, answer: "updated answer" });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Question not found");
    })

    it('should update a question', async () => {
        const question = await Question.create(questionFixture());
        const response = await request(app)
            .put(`/api/question/${question._id}`)
            .send({ question_no: "updated question_no", question_title: "updated question_title", question_desc: "updated question_desc", question_date: "2024-05-01T00:00:00.000Z", expiry: "2024-06-01T00:00:00.000Z", points: 11, answer: "updated answer" });
        expect(response.status).toBe(200);
        expect(response.body.question_no).toBe("updated question_no");
        expect(response.body.question_title).toBe("updated question_title");
        expect(response.body.question_desc).toBe("updated question_desc");
        expect(response.body.question_date).toBe("2024-05-01T00:00:00.000Z");
        expect(response.body.expiry).toBe("2024-06-01T00:00:00.000Z");
        expect(response.body.points).toBe(11);
        expect(response.body.answer).toBe("updated answer");
    })
})

describe('Delete Questions: DELETE /api/question/:id', () => {

    it('should not delete a question with invalid question id', async () => {
        const response = await request(app)
            .delete('/api/question/123456789012');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid question ID");
    });

    it('should not delete a question with non existing question id', async () => {
        const response = await request(app)
            .delete(`/api/question/65a8ba0b8c8139544b9955ac`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Question not found");
    });

    it('should delete a question', async () => {
        const question = await Question.create(questionFixture());
        const response = await request(app)
            .delete(`/api/question/${question._id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Question deleted");
    })
})

describe('Submit Questions: POST /api/question/submit/:id', () => {
    it('should not submit a question with invalid question id', async () => {
        const response = await request(app)
            .post('/api/question/submit/123456789012')
            .send(answerFixture());
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid question ID");
    });

    it('should not submit a question with non existing question id', async () => {
        const response = await request(app)
            .post(`/api/question/submit/65a8ba0b8c8139544b9955ac`)
            .send(answerFixture());
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Question not found");
    })

    it('should not submit a question with inactive question', async () => {
        const question = await Question.create(questionFixture({ active: false }));
        const response = await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture());
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Question is not active");
    })

    it('should not submit a question with expired question', async () => {
        const question = await Question.create(questionFixture({ expiry: "2021-06-01T00:00:00.000Z" }));
        const response = await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture());
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Question has expired");
    })

    it('should submit an incorrect answer', async () => {
        const user = await User.create(userFixture());
        const question = await Question.create(questionFixture({ answer: "answer", points: 12}));
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "incorrect answer", user: user._id, leaderboard: leaderboard._id}));
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
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));
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
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));
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
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));

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
            .post(`/api/question/submit/${question1._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/question/submit/${question2._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));

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
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "incorrect answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "incorrect answer2", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));

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
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "incorrect answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "incorrect answer2", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));
        await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "answer", user: user._id, leaderboard: leaderboard._id }));

        const updatedLeaderboard = await Leaderboard.findOne({ _id: leaderboard._id });
        expect(updatedLeaderboard.rankings.length).toBe(1);
        expect(updatedLeaderboard.rankings[0].user).toEqual(user._id);
        expect(updatedLeaderboard.rankings[0].points).toEqual(11);
    })
})

