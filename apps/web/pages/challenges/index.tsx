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
import { string } from "zod";
import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "default"
const anon_key =  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "default"

type UserData = {
  uuid: number;
  userId: string;
};

type SeasonData = {
  uuid: number;
  seasonName: string;
  seasonDescription: string;
};

interface Season {
  _id: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

interface SeasonApiResponse {
  seasons: Season[];
}

/////// dummy data

const currentUserData: UserData = {
  uuid: 2001,
  userId: "Eren Yeager",
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

///////////////

function parseDate(stringDate: String) {
  const date = stringDate.slice(0, 10);
  const time = stringDate.slice(11, 19);
  return date + "  " + time;
}

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
  const [seasons, setSeasons] = useState<Season[]>([]);

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

  useEffect(() => {
    fetch("http://localhost:3000/api/seasons/")
      .then((res: Response) => {
        return res.json();
      })
      .then((res: SeasonApiResponse) => {
        console.log("API Response:", res);

        if (res.seasons && Array.isArray(res.seasons)) {
          let seasons: Season[] = res.seasons;
          setSeasons(seasons);
        } else {
          console.error(
            "Invalid API response format: 'seasons' property not found or not an array."
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching seasons:", error);
      });
  }, []);
  
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
        {seasons ? (
          seasons.map((season) => (
            <Box
              key={String(season._id)}
              mt={10}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Card>
                <CardBody>
                  <Stack>
                    <Heading>{season.title}</Heading>
                    <Text>
                      Start Date: {parseDate(String(season.startDate))}
                    </Text>
                    <Text>End Date: {parseDate(String(season.endDate))}</Text>
                  </Stack>
                  <Divider my={3} />
                  <Flex justifyContent="flex-end">
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleJoinClick(season.title)}
                    >
                      Join
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
            </Box>
          ))
        ) : (
          <Text>No season found</Text>
        )}
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
