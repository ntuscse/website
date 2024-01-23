import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import styles from "./index.module.css";
import { useRouter } from "next/router";

type UserData = {
  uuid: number;
  userId: string;
};

const currentUserData: UserData = {
  uuid: 2001,
  userId: "Eren Yeager",
};

type SeasonData = {
  uuid: number;
  seasonName: string;
  seasonDescription: string;
};

const seasonData: SeasonData[] = [
  {
    uuid: 1001,
    seasonName: "season 1",
    seasonDescription:
      "this is the first ever chanllenge held by SCSE, problems vary from easy to hard mode. Everyone is welcome to join!",
  },
  {
    uuid: 1002,
    seasonName: "season 2",
    seasonDescription:
      "2nd season of challenge!! We added a few interesting problems. Come join the challenge to find out more!",
  },
];

const Challenges = () => {
  const router = useRouter();

  // TODO: jump to the selected season
  const handleJoinClick = (seasonName: string) => {
    router.push("/challenges/problems");
  };

  return (
    <Flex minH="100vh" pt={24} flexDirection="column" alignItems="center">
      <Box flexDirection="row" justifyContent="space-between" p={4} mt={4}>
        <Text fontSize="70" display="flex" alignItems="center">
          Welcome
          <Text className={styles.userName}>
            &nbsp;{currentUserData.userId}
          </Text>
        </Text>
      </Box>
      <Box mt={4}>
        <Text fontSize="40" as="i">
          Explore the ongoing challenges!
        </Text>
      </Box>
      <Box flexDirection="column" mb={10}>
        {seasonData.map((season) => (
          <Box
            key={season.uuid}
            mt={10}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Card>
              <CardBody>
                <Stack>
                  <Heading>{season.seasonName}</Heading>
                  <Text>{season.seasonDescription}</Text>
                </Stack>
                <Divider my={3} />
                <Flex justifyContent="flex-end">
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleJoinClick(season.seasonName)}
                  >
                    Join
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default Challenges;
