import { z } from "zod";
import QuestionService from "./questionService";

const isHello = (input: any) => {
    // use zod to confirm input is string
    z.string().parse(input);

    return input === 'hello';
}

// DO NOT EXPOSE this map. Add new validation function by directly adding to the map
const validationFunctionMap: Map<string, Function> = new Map<string, Function>([
    ['isHello', isHello],
]);

const getValidationFunction = (functionName: string) => {
    if (validationFunctionMap.has(functionName)) {
        return validationFunctionMap.get(functionName);
    }
    return null;
}

const validateAnswer = async (
    questionID: string,
    submission: any,
): Promise<boolean> => {

    const question = await QuestionService.getQuestionByID(questionID);
    if (!question) {
        throw new Error('Question not found');
    }

    //check if validation function exists as keys
    const invokeFunction = getValidationFunction(question.validation_function);
    if (!invokeFunction) {
        throw new Error('Validation function not found');
    }

    try{
        const isCorrect = invokeFunction(submission);
        return isCorrect;
    }catch (e) {
        console.log(`validationService validateAnswer fail to validate answer: ${e}`)
        return false;
    }
}

const ValidationService = {
    validateAnswer,
    getValidationFunction,
}

export { ValidationService as default }