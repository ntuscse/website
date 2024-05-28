import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


type InputData = {
  input: string;
};

interface Problem {
  uuid: string;
  title: string;
  desc: string;
  answer: string
}

const inputData: InputData = {
  input: "2\n5\n30 40 20 20 100\n6\n1 2 3 4 5 6",
};

const Profile = () => {
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [problem, setProblem] = useState<Problem>();
  
  const router = useRouter()
  const toast = useToast();

  const handleUserInputChange = (event: { target: { value: string } }) => {
    setUserInput(event.target.value);
  };

  // validation placeholder
  function validateAnswer(userInput: string | number) {
    if (!userInput) {
      setErrorMessage("input is required");
      setIsInvalid(true);
    } else if (isNaN(Number(userInput))) {
      setErrorMessage("numbers only");
      setIsInvalid(true);
    } else if (userInput != problem?.answer) {
      // just a dummy hardcoded answer here
      setErrorMessage("wrong answer, please try again");
      setIsInvalid(true);
    } else {
      setErrorMessage("");
      setIsCorrect(true);
    }

    return;
  }

  const handleSubmit = () => {
    // Reset correctness state before validating
    setIsCorrect(false);
    setIsInvalid(false);
    validateAnswer(userInput);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputData.input);
    toast({
      title: "Input has been copied to clipboard!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/question/${router.query.id}`)
    .then((res: Response) => {
      return res.json()
    })
    .then((res: any) => {
      const resProbem: Problem = {
        uuid: res._uid,
        title: res.question_title,
        desc: res.question_desc,
        answer: res.answer
      }
      setProblem(resProbem)
    })
  }, [])

  return (
    <Flex minH="100vh" flexDirection="row" justifyContent="space-around">
      <Box
        w="80vw"
        color="black"
        mt={40}
        mb={10}
        mx={20}
        flexDirection="column"
      >
        <Text>-- {problem?.title} --</Text>
        <Button variant="link" color="#6AA8FA" onClick={onOpen}>
          [ Puzzle Input ]
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Your Input</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text whiteSpace="pre-wrap">{inputData.input}</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} size="sm" mr={3}>
                Close
              </Button>
              <Button
                onClick={handleCopy}
                size="sm"
                variant="outline"
                rightIcon={<CopyIcon />}
              >
                Copy
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Text>
          {problem?.desc}
        </Text>
      </Box>
      <Box w="40vw" px={4} my={40} mx={10} flexDirection="column">
        <FormControl isInvalid={isInvalid}>
          <FormLabel>Answer:</FormLabel>
          <Input
            placeholder="input your answer"
            value={userInput}
            onChange={handleUserInputChange}
          />

          {isCorrect ? (
            <Text color="green" mt={2}>
              Hooray! Your answer is correct.
            </Text>
          ) : (
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          )}

          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            size="sm"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default Profile;
