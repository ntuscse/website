import LeaderboardEntry from "@/features/challenges/components/LeaderboardEntry"
import { Box, Flex, Text } from "@chakra-ui/react"

interface LeaderboardData {
    uuid: number,
    userId: string,
    points: number
}
const Leaderboard = () => {
    // placeholder for API Response
    const data: LeaderboardData[] = [
        { uuid: 1000, userId: "alex200", points: 100 },
        { uuid: 1001, userId: "johndoe010", points: 200 },
        { uuid: 1002, userId: "janedoe345", points: 350 },
    ]
    return (<Flex
        minH="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Text textAlign="start" w="80vw">Leaderboard</Text>
        <Box bg="#CBD5E0" w="80vw" px={8} py={4} minHeight="70vh" borderRadius="8">
            {data.sort().reverse().map((item, index) => {
                return <LeaderboardEntry key={item.uuid} index={index+1} name={item.userId} points={item.points}/>
            })}
            
      
        </Box>
    </Flex>)
}

export default Leaderboard