import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
const Question = require('../model/question');
const Submission = require('../model/submission');
const User = require('../model/user');
const Leaderboard = require('../model/leaderboard');

function userFixture(overrides = {}) {
    var defaultValues = {
        name: (Math.random() + 1).toString(36).substring(2),
        email: (Math.random() + 1).toString(36).substring(2),
        active: true,
    };

    return { ...defaultValues, ...overrides };
}

function questionFixture(overrides = {}) {
    var defaultValues = {
        question_no: (Math.random() + 1).toString(36).substring(2),
        question_title: (Math.random() + 1).toString(36).substring(2),
        question_desc: (Math.random() + 1).toString(36).substring(2),
        question_date: "2022-05-01T00:00:00.000Z",
        expiry: "2040-06-01T00:00:00.000Z",
        points: 10,
        answer: (Math.random() + 1).toString(36).substring(2),
        submissions: [],
        active: true,
    };

    return { ...defaultValues, ...overrides };
}

function answerFixture(overrides = {}) {
    var defaultValues = {
        name: (Math.random() + 1).toString(36).substring(2),
        answer: (Math.random() + 1).toString(36).substring(2),
    };

    return { ...defaultValues, ...overrides };
};

function leaderboardFixture(overrides = {}) {
    var defaultValues = {
        title: (Math.random() + 1).toString(36).substring(2),
        start_date: "2023-05-01T00:00:00.000Z",
        end_date: "2040-06-01T00:00:00.000Z",
        rankings: [],
        active: true,
    };

    return { ...defaultValues, ...overrides };
}

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

describe('List Leaderboards: GET /api/leaderboard', () => {
    beforeAll(async () => {
        await Leaderboard.deleteMany({});
        await Leaderboard.create(leaderboardFixture());
        await Leaderboard.create(leaderboardFixture());
        await Leaderboard.create(leaderboardFixture({ active: false}));
    });

    it('should return all leaderboards', async () => {
        const response = await request(app).get('/api/leaderboard');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });

    it('should return only active leaderboards', async () => {
        const response = await request(app).get('/api/leaderboard/active');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
})

describe('Get Leaderboard: GET /api/leaderboard/:id', () => {
    it('should not get a leaderboard with invalid leaderboard id', async () => {
        const response = await request(app).get('/api/leaderboard/123456789012');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid leaderboard ID");
    })

    it('should not get a leaderboard with non existing leaderboard id', async () => {
        const response = await request(app).get(`/api/leaderboard/65a8ba0b8c8139544b9955ac`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Leaderboard not found");
    })

    it('should get a leaderboard', async () => {
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app).get(`/api/leaderboard/${leaderboard._id}`);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(leaderboard.title);
        expect(new Date(response.body.start_date)).toEqual(new Date(leaderboard.start_date));
        expect(new Date(response.body.end_date)).toEqual(new Date(leaderboard.end_date));
        expect(response.body.rankings.length).toBe(0);
    })
});

describe('Set Leaderboard: POST /api/leaderboard', () => {
    it('should not set a leaderboard with missing fields', async () => {
        const response = await request(app)
            .post('/api/leaderboard')
            .send(leaderboardFixture({ title: null }));
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Leaderboard validation failed: title: Please add a title");
    })

    it('should set a leaderboard', async () => {
        const leaderboard = leaderboardFixture();
        const response = await request(app)
            .post('/api/leaderboard')
            .send(leaderboard);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(leaderboard.title);
        expect(new Date(response.body.start_date)).toEqual(new Date(leaderboard.start_date));
        expect(new Date(response.body.end_date)).toEqual(new Date(leaderboard.end_date));
        expect(response.body.rankings.length).toBe(0);
    })
})

describe('Update Leaderboard: PUT /api/leaderboard/:id', () => {
    it('should not update a leaderboard with invalid leaderboard id', async () => {
        const response = await request(app)
            .put('/api/leaderboard/123456789012')
            .send(leaderboardFixture());
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid leaderboard ID");
    })

    it('should not update a leaderboard with non existing leaderboard id', async () => {
        const response = await request(app)
            .put(`/api/leaderboard/65a8ba0b8c8139544b9955ac`)
            .send(leaderboardFixture());
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Leaderboard not found");
    })

    it('should update a leaderboard', async () => {
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app)
            .put(`/api/leaderboard/${leaderboard._id}`)
            .send(leaderboardFixture({ title: "Updated Title", active: false, start_date: "2024-05-01T00:00:00.000Z", end_date: "2041-06-01T00:00:00.000Z" }));
        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Updated Title");
        expect(new Date(response.body.start_date)).toEqual(new Date("2024-05-01T00:00:00.000Z"));
        expect(new Date(response.body.end_date)).toEqual(new Date("2041-06-01T00:00:00.000Z"));
        expect(response.body.active).toBe(false);
    })
})

describe('Delete Leaderboard: DELETE /api/leaderboard/:id', () => {
    it('should not delete a leaderboard with invalid leaderboard id', async () => {
        const response = await request(app).delete('/api/leaderboard/123456789012');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid leaderboard ID");
    })

    it('should not delete a leaderboard with non existing leaderboard id', async () => {
        const response = await request(app).delete(`/api/leaderboard/65a8ba0b8c8139544b9955ac`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Leaderboard not found");
    })

    it('should delete a leaderboard', async () => {
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app).delete(`/api/leaderboard/${leaderboard._id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Leaderboard deleted");
    })
})

describe('Get Leaderboard Rankings: GET /api/leaderboard/rankings/:id/:top', () => {
    it('should not get leaderboard rankings with invalid leaderboard id', async () => {
        const response = await request(app).get('/api/leaderboard/rankings/123456789012/10');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid leaderboard ID");
    })

    it('should not get leaderboard rankings with non existing leaderboard id', async () => {
        const response = await request(app).get(`/api/leaderboard/rankings/65a8ba0b8c8139544b9955ac/10`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Leaderboard not found");
    })

    it('should not get leaderboard rankings with invalid top', async () => {
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app).get(`/api/leaderboard/rankings/${leaderboard._id}/abc`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid top");
    })

    it('should not get leaderboard rankings with negative top', async () => {
        const leaderboard = await Leaderboard.create(leaderboardFixture());
        const response = await request(app).get(`/api/leaderboard/rankings/${leaderboard._id}/-1`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid top");
    })

    it('should get leaderboard rankings', async () => {
        const leaderboard = await Leaderboard.create(leaderboardFixture({ title: "Winter 2023", start_date: "2023-12-01T00:00:00.000Z", end_date: "2024-01-01T00:00:00.000Z", active: true}));
        const user1 = await User.create(userFixture());
        const user2 = await User.create(userFixture());
        const user3 = await User.create(userFixture());
        const question1 = await Question.create(questionFixture());
        const question2 = await Question.create(questionFixture());
        const question3 = await Question.create(questionFixture());
        const submission1 = await Submission.create({ user: user1._id, leaderboard: leaderboard._id, question: question1._id, answer: "Answer 1", points: 10 });
        const submission2 = await Submission.create({ user: user2._id, leaderboard: leaderboard._id, question: question2._id, answer: "Answer 2", points: 20 });
        const submission3 = await Submission.create({ user: user3._id, leaderboard: leaderboard._id, question: question3._id, answer: "Answer 3", points: 30 });
        const response = await request(app).get(`/api/leaderboard/rankings/${leaderboard._id}/2`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].user.name).toBe(user3.name);
        expect(response.body[0].points).toBe(30);
        expect(response.body[1].user.name).toBe(user2.name);
        expect(response.body[1].points).toBe(20);
    })
})
