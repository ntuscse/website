import { z } from "zod";
import QuestionService from "./questionService";
import { Logger } from "nodelogger";

const isHello = (userAnswer: unknown, _userSpecificInput: unknown) => {
  // use zod to confirm input is string
  const parsedAnswer = z.string().parse(userAnswer);

  return parsedAnswer === "hello";
};

const isSum = (userAnswer: unknown, userSpecificInput: unknown) => {
  const parsedAnswer = z.number().int().parse(userAnswer);
  const parsedQuestionInput = z.coerce
    .number()
    .array()
    .length(2)
    .parse(userSpecificInput);

  return parsedAnswer === parsedQuestionInput[0] + parsedQuestionInput[1];
};

// DO NOT EXPOSE this map. Add new validation function by directly adding to the map
const validationFunctionMap: Map<
  string,
  (userAnswer: unknown, userSpecificInput: unknown) => boolean
> = new Map<
  string,
  (userAnswer: unknown, userSpecificInput: unknown) => boolean
>([
  ["isHello", isHello],
  ["isSum", isSum],
]);

const GetValidationFunction = (functionName: string) => {
  if (validationFunctionMap.has(functionName)) {
    return validationFunctionMap.get(functionName);
  }
  return null;
};

const ValidateAnswer = async (
  userID: string,
  questionID: string,
  submission: unknown
): Promise<boolean> => {
  const question = await QuestionService.GetUserSpecificQuestion(
    userID,
    questionID
  );
  if (!question) {
    throw new Error("Question not found");
  }

  //check if validation function exists as keys
  Logger.info(
    `ValidationService.validateAnswer received question ${question._id.toString()}, invoking validation function: ${question.validation_function}`
  );
  const invokeFunction = GetValidationFunction(question.validation_function);
  if (!invokeFunction) {
    Logger.error(
      `ValidationService.validateAnswer failed to invoke question ${question._id.toString()}'s validation function: ${question.validation_function}`
    );
    throw new Error("Validation function not found");
  }

  try {
    const isCorrect = invokeFunction(submission, question.question_input);
    return isCorrect;
  } catch (err) {
    Logger.error(
      `validationService validateAnswer fail to validate question ${question._id.toString()}'s answer`,
      err
    );
    return false;
  }
};

const generateOneTwo = (): string[] => {
  return ["1", "2", "1, 2"];
};

const generateNumbers = (): string[] => {
  const min = 0;
  const max = 100;
  function getRandomInt() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return [getRandomInt().toString(), getRandomInt().toString()];
};
// DO NOT EXPOSE this map. Add new validation function by directly adding to the map
const generateInputFunctionMap: Map<string, () => string[]> = new Map<
  string,
  () => string[]
>([
  ["generateOneTwo", generateOneTwo],
  ["generateNumbers", generateNumbers],
]);

const GetGenerateInputFunction = (functionName: string) => {
  if (generateInputFunctionMap.has(functionName)) {
    return generateInputFunctionMap.get(functionName);
  }
  return null;
};

const GenerateInput = async (questionID: string): Promise<string[]> => {
  const question = await QuestionService.GetQuestionByID(questionID);
  if (!question) {
    throw new Error("Question not found");
  }

  //check if validation function exists as keys
  const invokeFunction = GetGenerateInputFunction(
    question.generate_input_function
  );
  if (!invokeFunction) {
    throw new Error("Validation function not found");
  }

  try {
    const input = invokeFunction();
    return input;
  } catch (e) {
    Logger.error(`validationService validateAnswer fail to validate answer`, e);
    throw new Error("fail to generate input");
  }
};

const ValidationService = {
  ValidateAnswer,
  GetValidationFunction,
  GenerateInput,
  GetGenerateInputFunction,
};

export { ValidationService as default };
