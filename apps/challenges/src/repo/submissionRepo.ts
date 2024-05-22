import Submission, { SubmissionModel } from "../model/submission";

const createSubmission = (submission: SubmissionModel) => {
  return Submission.create(submission);
};

const SubmissionRepo = {
  createSubmission,
};

export default SubmissionRepo;
