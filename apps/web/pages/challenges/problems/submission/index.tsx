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

interface Problem {
  uuid: string;
  title: string;
  desc: string;
  problemInput: string[];
}

interface SubmissionResponse {
  message: string,
  data: {
    correct: boolean,
    points_awarded: number
  }
}

const Profile = () => {
  const [userInput, setUserInput] = useState("")
  const [puzzleInput, setPuzzleInput] = useState("");
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

  function validateAnswer(userInput: string | number) {
    if (!userInput) {
      setErrorMessage("input is required");
      setIsInvalid(true);
      return;
    } 

    
    let body = {
      answer: userInput,
      question: problem?.uuid
    }
    let headers = {
      "Authorization": retrieveCookie("access_token"),
      "Content-Type": "application/json"
    }
    fetch("http://localhost:3000/api/submission", {method: "POST", body: JSON.stringify(body), headers: headers})
    .then((res: Response) => {
      return res.json()
    })
    .then((res: SubmissionResponse) => {
      let correct = res.data.correct;
      if (correct) {
        setIsCorrect(true)
        setErrorMessage("")
      } else {
      setErrorMessage("wrong answer, please try again");
      setIsInvalid(true);
      }
    })

    return;
  }

  const handleSubmit = () => {
    // Reset correctness state before validating
    setIsCorrect(false);
    setIsInvalid(false);
    validateAnswer(userInput);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(puzzleInput);
    toast({
      title: "Input has been copied to clipboard!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const retrieveCookie = (key: string) => {
    // Split cookie string into an array of key-value pairs
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // Remove leading/trailing whitespace
  
      // Check if cookie name matches the desired name
      if (cookie.startsWith(key + '=')) {
        // Return the value part of the cookie
        return cookie.split('=')[1];
      }
    }
  
    // If no cookie found
    return "nil";
  }

  const parsePuzzleInput = (input: string[]) => {
    let parsedInput = ""
    input.forEach((ele) => {
      parsedInput += ele + "\n"
    })
    return parsedInput
  }

  useEffect(() => {
    const questionUrl = `http://localhost:3000/api/question/${router.query.id}` + (document.cookie.includes("access_token") ? "/user" : "")
    const headers = {"Authorization": document.cookie.includes("access_token") ?  retrieveCookie("access_token") : ""}
    fetch(questionUrl, {headers: headers})
    .then((res: Response) => {
      return res.json()
    })
    .then((res: any) => {
      const resProbem: Problem = {
        uuid: res.id,
        title: res.question_title,
        desc: res.question_desc,
        problemInput: res.question_input
      }
      setProblem(resProbem)
      if (document.cookie.includes("access_token")) setPuzzleInput(parsePuzzleInput(resProbem.problemInput))
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
              <Text whiteSpace="pre-wrap">{puzzleInput}</Text>
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
        {document.cookie.includes("access_token") ? 
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
        : <></>}
        
      </Box>
    </Flex>
  );
};

export default Profile;
