import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";

const Profile = () => {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  // validation placeholder
  function validateAnswer(input: string | number) {
    if (!input) {
      setErrorMessage("input is required");
      setIsInvalid(true);
    } else if (isNaN(Number(input))) {
      setErrorMessage("numbers only");
      setIsInvalid(true);
    } else if (input != 5) {
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
    validateAnswer(input);
  };

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
        <Text>-- Cube Conundrum --</Text>
        <Text color="#6AA8FA">[ Puzzle Input ]</Text>
        <Text>
          You're launched high into the atmosphere! The apex of your trajectory
          just barely reaches the surface of a large island floating in the sky.
          You gently land in a fluffy pile of leaves. It's quite cold, but you
          don't see much snow. An Elf runs over to greet you. <br /> <br />
          The Elf explains that you've arrived at Snow Island and apologizes for
          the lack of snow. He'll be happy to explain the situation, but it's a
          bit of a walk, so you have some time. They don't get many visitors up
          here; would you like to play a game in the meantime? <br /> <br />
          As you walk, the Elf shows you a small bag and some cubes which are
          either red, green, or blue. Each time you play this game, he will hide
          a secret number of cubes of each color in the bag, and your goal is to
          figure out information about the number of cubes. <br /> <br />
          To get information, once a bag has been loaded with cubes, the Elf
          will reach into the bag, grab a handful of random cubes, show them to
          you, and then put them back in the bag. He'll do this a few times per
          game. <br /> <br />
          You play several games and record the information from each game (your
          puzzle input). Each game is listed with its ID number (like the 11 in
          Game 11: ...) followed by a semicolon-separated list of subsets of
          cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).{" "}
          <br /> <br />
          For example, the record of a few games might look like this: <br />
          Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green Game 2: 1 blue,
          2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue Game 3: 8 green, 6
          blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red Game 4: 1 green,
          3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red Game 5: 6 red,
          1 blue, 3 green; 2 blue, 1 red, 2 green <br /> <br />
          In game 1, three sets of cubes are revealed from the bag (and then put
          back again). The first set is 3 blue cubes and 4 red cubes; the second
          set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is
          only 2 green cubes. <br /> <br />
          The Elf would first like to know which games would have been possible
          if the bag contained only 12 red cubes, 13 green cubes, and 14 blue
          cubes? <br /> <br />
          In the example above, games 1, 2, and 5 would have been possible if
          the bag had been loaded with that configuration. However, game 3 would
          have been impossible because at one point the Elf showed you 20 red
          cubes at once; similarly, game 4 would also have been impossible
          because the Elf showed you 15 blue cubes at once. If you add up the
          IDs of the games that would have been possible, you get 8. <br />{" "}
          <br />
          Determine which games would have been possible if the bag had been
          loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What
          is the sum of the IDs of those games? <br /> <br />
        </Text>
      </Box>
      <Box w="40vw" px={4} my={40} mx={10} flexDirection="column">
        <FormControl isInvalid={isInvalid}>
          <FormLabel>Answer:</FormLabel>
          <Input
            placeholder="input your answer"
            value={input}
            onChange={handleInputChange}
          />

          {isCorrect ? (
            <Text color="green" mt={2}>
              "Hooray! Your answer is correct."
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
