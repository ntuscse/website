import { z } from "zod";
import QuestionService from "./questionService";

const isHello = (input: any) => {
  // use zod to confirm input is string
  z.string().parse(input);

  return input === "hello";
};

// DO NOT EXPOSE this map. Add new validation function by directly adding to the map
const validationFunctionMap: Map<string, (input: any) => boolean> = new Map<
  string,
  (input: any) => boolean
>([["isHello", isHello]]);

const getValidationFunction = (functionName: string) => {
  if (validationFunctionMap.has(functionName)) {
    return validationFunctionMap.get(functionName);
  }
  return null;
};

const validateAnswer = async (
  questionID: string,
  submission: any
): Promise<boolean> => {
  const question = await QuestionService.getQuestionByID(questionID);
  if (!question) {
    throw new Error("Question not found");
  }

  //check if validation function exists as keys
  const invokeFunction = getValidationFunction(question.validation_function);
  if (!invokeFunction) {
    throw new Error("Validation function not found");
  }

  try {
    const isCorrect = invokeFunction(submission);
    return isCorrect;
  } catch (err) {
    console.log(
      `validationService validateAnswer fail to validate answer`,
      err
    );
    return false;
  }
};

const generateOneTwo = (): string[] => {
  return ["1", "2", "1, 2"];
};

// DO NOT EXPOSE this map. Add new validation function by directly adding to the map
const generateInputFunctionMap: Map<string, () => string[]> = new Map<
  string,
  () => string[]
>([["generateOneTwo", generateOneTwo]]);

const getGenerateInputFunction = (functionName: string) => {
  if (generateInputFunctionMap.has(functionName)) {
    return generateInputFunctionMap.get(functionName);
  }
  return null;
};

const generateInput = async (questionID: string): Promise<string[]> => {
  const question = await QuestionService.getQuestionByID(questionID);
  if (!question) {
    throw new Error("Question not found");
  }

  //check if validation function exists as keys
  const invokeFunction = getGenerateInputFunction(
    question.generate_input_function
  );
  if (!invokeFunction) {
    throw new Error("Validation function not found");
  }

  try {
    const input = invokeFunction();
    return input;
  } catch (e) {
    console.log(`validationService validateAnswer fail to validate answer`, e);
    throw new Error("fail to generate input");
  }
};

const ValidationService = {
  validateAnswer,
  getValidationFunction,
  generateInput,
  getGenerateInputFunction,
};

export { ValidationService as default };
