import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
const Question = require('../model/question');
const Submission = require('../model/submission');

// create question fixture
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

beforeAll(async () => {
    await Question.deleteMany({})
    await Submission.deleteMany({})
})
  
afterAll(async () => {
    await Question.deleteMany({})
    await Submission.deleteMany({})
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
        expect(response.body.question_date).toBe(question.question_date);
        expect(response.body.expiry).toBe(question.expiry);
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

    it('should submit an answer', async () => {
        const question = await Question.create(questionFixture({ answer: "answer", points: 11}));
        const response = await request(app)
            .post(`/api/question/submit/${question._id}`)
            .send(answerFixture({ answer: "answer" }));
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Answer submitted");

        const submission = await Submission.findOne({ question: question._id });
        expect(submission.answer).toBe("answer");
        expect(submission.correct).toBe(true);

        const updatedQuestion = await Question.findOne({ _id: question._id });
        expect(updatedQuestion.submissions.length).toBe(1);
        expect(updatedQuestion.submissions[0]).toEqual(submission._id);
    })
})