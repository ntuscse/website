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
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
    seasonName: "season1",
    seasonDescription:
      "this is the first ever chanllenge held by SCSE, problems vary from easy to hard mode. Everyone is welcome to join!",
  },
  {
    uuid: 1002,
    seasonName: "season2",
    seasonDescription:
      "2nd season of challenge!! We added a few interesting problems. Come join the challenge to find out more!",
  },
];

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "default"
const anon_key =  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "default"

async function signInWithAzure() {
  const supabase = createClient(supabase_url, anon_key)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
        redirectTo: 'http://localhost:3001/challenges'
      },
    })
  }

const Challenges = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (window.location.hash) {
      let accessToken = window.location.hash.split("=")[1]
      document.cookie = `access_token=${accessToken}`
    }
    if (document.cookie.includes("access_token")) {
      setIsLogin(true)
    }
  })
 
  // TODO: jump to the selected season
  const handleJoinClick = (seasonName: string) => {
    console.log(seasonName);
    router.push({
      pathname: "/challenges/problems",
      query: { season: seasonName },
    });
  };

  return ( isLogin ?
    // logged in
    <Flex minH="100vh" pt={24} flexDirection="column" alignItems="center">
      <Box flexDirection="row" justifyContent="space-between" p={4} mt={4}>
        <Text fontSize="70" display="flex" alignItems="center">
          Welcome&nbsp;
          <span className={styles.userName}>{currentUserData.userId}</span>
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
    : 
    // not logged in
    <Flex minH="100vh" pt={24} flexDirection="column" alignItems="center" justifyContent="center">
      <Button onClick={signInWithAzure}>Sign in with Microsoft</Button>
    </Flex>
  );
};

export default Challenges;
