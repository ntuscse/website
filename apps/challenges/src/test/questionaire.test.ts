import * as chai from 'chai';
import { before, after } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../index';
import Question, {QuestionModel} from '../model/question';
import { randomUUID } from 'crypto';

const should = chai.should();

chai.use(chaiHttp);

// create question fixture
function questionFixture(overrides: Partial<QuestionModel> = {}): QuestionModel {
    return {
        _id: randomUUID(),
        question_no: overrides.question_no || (Math.random() + 1).toString(36).substring(2),
        question_title: overrides.question_title || (Math.random() + 1).toString(36).substring(2),
        question_desc: overrides.question_desc || (Math.random() + 1).toString(36).substring(2),
        question_date: overrides.question_date || "2022-05-01T00:00:00.000Z",
        expiry: overrides.expiry || "2022-06-01T00:00:00.000Z",
        points: overrides.points || 10,
        answer: overrides.answer || (Math.random() + 1).toString(36).substring(2),
        submissions: overrides.submissions || [],
        active: overrides.active || true,
    };
}

describe('List Questions: GET /api/question', () => {
    before(async function () {
        const question1 = questionFixture();
        const question2 = questionFixture();
        const inactiveQuestion = questionFixture({ "active": false });
        await Question.create(question1); 
        await Question.create(question2);
        await Question.create(inactiveQuestion);
    });

    it('should get all questions', (done) => {
        chai.request(app)
            .get('/api/question')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.not.be.empty;
                done();
            });
    });

    it('should get all active questions', (done) => {
        chai.request(app)
            .get('/api/question/active')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.not.be.empty;
                res.body.forEach((question: any) => {
                    question.should.have.property('active').eq(true);
                });
                done();
            });
    });
});