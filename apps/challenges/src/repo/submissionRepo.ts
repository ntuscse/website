import Submission, { SubmissionModel } from "../model/submission";

const createSubmission = async (submission: Omit<SubmissionModel, "_id">) => {
  return await Submission.create(submission);
};

const GetToBeCalculatedSubmissions = async (): Promise<SubmissionModel[]> => {
  return await Submission.find({
    $or: [
      { ranking_is_calculated: false },
      { ranking_is_calculated: { $exists: false } },
    ],
  });
};

const SetSubmissionsToCalculated = async (submissions: SubmissionModel[]) => {
  if (submissions.length == 0) {
    return;
  }
  const result = await Submission.bulkWrite(
    submissions.map((s) => {
      return {
        updateOne: {
          filter: { _id: s._id },
          update: { ranking_is_calculated: true },
        },
      };
    })
  );
  const errors = result.getWriteErrors();
  if (errors.length != 0) {
    throw new Error(JSON.stringify(errors));
  }
};
const SubmissionRepo = {
  createSubmission,
  GetToBeCalculatedSubmissions,
  SetSubmissionsToCalculated,
};

export default SubmissionRepo;
