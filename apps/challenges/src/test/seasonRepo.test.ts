import SeasonRepo from "../repo/seasonRepo";
import Season from "../model/season";
import Question from "../model/question";
import Submission from "../model/submission";
import User from "../model/user";
import mongoose from "mongoose";
import { submissionFixture } from "../utils/fixtures/submission";
import { userFixture } from "../utils/fixtures/fixtures";
import { questionFixture } from "../utils/fixtures/question";
import { connectTestDB } from "../config/db";

beforeAll(async () => {
  await connectTestDB();
  await Season.deleteMany({});
  await Question.deleteMany({});
  await Submission.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await Season.deleteMany({});
  await Question.deleteMany({});
  await Submission.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("calculateSeasonRankings", () => {
  afterEach(async () => {
    await Season.deleteMany({});
    await Question.deleteMany({});
    await Submission.deleteMany({});
    await User.deleteMany({});
  });

  it("should return all rankings", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const questionID = new mongoose.Types.ObjectId();
    const userID = new mongoose.Types.ObjectId();

    const name = "Hello";
    await Submission.create(
      submissionFixture({
        seasonID: seasonID,
        user: userID,
        question: questionID,
      })
    );
    await User.create(
      userFixture({
        _id: userID,
        name: name,
      })
    );
    const rankings = await SeasonRepo.calculateSeasonRankings(seasonID);
    expect(rankings).toHaveLength(1);
    expect(rankings).toContainEqual({
      points: 10,
      user: {
        userID: userID,
        name: name,
      },
    });
  });

  it("should return multiple users if there is multiple users", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const userID = new mongoose.Types.ObjectId();
    const userID2 = new mongoose.Types.ObjectId();
    const name = "Hello";
    const name2 = "Hello2";
    for (let i = 0; i < 6; i++) {
      const questionID = new mongoose.Types.ObjectId();
      await Submission.create(
        submissionFixture({
          seasonID: seasonID,
          user: userID,
          question: questionID,
        })
      );

      await Submission.create(
        submissionFixture({
          seasonID: seasonID,
          user: userID2,
          question: questionID,
        })
      );
    }
    for (let i = 0; i < 2; i++) {
      const questionID = new mongoose.Types.ObjectId();
      await Submission.create(
        submissionFixture({
          seasonID: seasonID,
          user: userID2,
          question: questionID,
        })
      );
    }
    await User.create(
      userFixture({
        _id: userID,
        name: name,
      })
    );
    await User.create(
      userFixture({
        _id: userID2,
        name: name2,
      })
    );
    const rankings = await SeasonRepo.calculateSeasonRankings(seasonID);
    expect(rankings).toHaveLength(2);
    expect(rankings).toContainEqual({
      points: 60,
      user: {
        userID: userID,
        name: name,
      },
    });
    expect(rankings).toContainEqual({
      points: 80,
      user: {
        userID: userID2,
        name: name2,
      },
    });
  });

  it("should return only the users that have submission (user with no submission should not be in leaderboard)", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const userID = new mongoose.Types.ObjectId();
    const userID2 = new mongoose.Types.ObjectId();
    const name = "Hello";
    const name2 = "Hello2";
    for (let i = 0; i < 8; i++) {
      const questionID = new mongoose.Types.ObjectId();

      await Submission.create(
        submissionFixture({
          seasonID: seasonID,
          user: userID,
          question: questionID,
        })
      );
    }
    await User.create(
      userFixture({
        _id: userID,
        name: name,
      })
    );
    await User.create(
      userFixture({
        _id: userID2,
        name: name2,
      })
    );
    const rankings = await SeasonRepo.calculateSeasonRankings(seasonID);
    expect(rankings).toHaveLength(1);
    expect(rankings).toContainEqual({
      points: 80,
      user: {
        userID: userID,
        name: name,
      },
    });
  });
});

describe("getSeasonQuestions", () => {
  afterEach(async () => {
    await Season.deleteMany({});
    await Question.deleteMany({});
    await Submission.deleteMany({});
    await User.deleteMany({});
  });

  it("should return all questions", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const questionID = new mongoose.Types.ObjectId();
    const questionID2 = new mongoose.Types.ObjectId();

    const fixture1 = questionFixture({
      _id: questionID,
      seasonID: seasonID,
    });
    const fixture2 = questionFixture({
      _id: questionID2,
      seasonID: seasonID,
    });
    await Question.create(fixture1);
    await Question.create(fixture2);
    const questions = await SeasonRepo.getSeasonQuestions(seasonID);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const question of questions!) {
      delete question["__v"];
      delete question["createdAt"];
      delete question["updatedAt"];
    }
    expect(questions).toHaveLength(2);
    expect(questions).toContainEqual(fixture1);
    expect(questions).toContainEqual(fixture2);
  });

  it("should return only the questions that belong to the season", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const questionID = new mongoose.Types.ObjectId();
    const questionID2 = new mongoose.Types.ObjectId();
    const questionID3 = new mongoose.Types.ObjectId();

    const fixture1 = questionFixture({
      _id: questionID,
      seasonID: seasonID,
    });
    const fixture2 = questionFixture({
      _id: questionID2,
      seasonID: seasonID,
    });
    const fixture3 = questionFixture({
      _id: questionID3,
      seasonID: new mongoose.Types.ObjectId(),
    });
    await Question.create(fixture1);
    await Question.create(fixture2);
    await Question.create(fixture3);
    const questions = await SeasonRepo.getSeasonQuestions(seasonID);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const question of questions!) {
      delete question["__v"];
      delete question["createdAt"];
      delete question["updatedAt"];
    }
    expect(questions).toHaveLength(2);
    expect(questions).toContainEqual(fixture1);
    expect(questions).toContainEqual(fixture2);
    expect(questions).not.toContainEqual(fixture3);
  });

  it("should return empty array if there is no questions", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const questions = await SeasonRepo.getSeasonQuestions(seasonID);
    expect(questions).toHaveLength(0);
  });
});
