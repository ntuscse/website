import LeaderboardEntry from "@/features/challenges/components/LeaderboardEntry"
import { Box, Flex, Select, Spacer, Text } from "@chakra-ui/react"
import { useState } from "react"

// placeholder for API Response
let currentSeasonData: LeaderboardData[] = [
    { uuid: 1000, userId: "alex200", points: 100 },
    { uuid: 1001, userId: "johndoe010", points: 200 },
    { uuid: 1002, userId: "janedoe345", points: 350 },
]

const seasonTwoData: LeaderboardData[] = [
    { uuid: 1000, userId: "harvey562", points: 209 },
    { uuid: 1001, userId: "pam391", points: 540 },
    { uuid: 1002, userId: "linus903", points: 250 },
]

interface LeaderboardData {
    uuid: number,
    userId: string,
    points: number
}
const Leaderboard = () => {
    const [currentDisplayedData, setCurrentDisplayedData] = useState(currentSeasonData)

    function handleDataChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // fetch and update leaderboard
        switch (event.target.value) {
            case 'season-id-1':
                setCurrentDisplayedData(currentSeasonData)
                break
            case 'season-id-2': 
                setCurrentDisplayedData(seasonTwoData)
                break
        }
    
    }
    return (<Flex
        minH="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
            <Select bg='#CBD5E0' borderColor='#CBD5E0' w="80vw" my={4} onChange={handleDataChange}>
                <option value='season-id-1'>Current Season</option>
                <option value='season-id-2'>Season 2</option>
            </Select>
        <Box bg="#CBD5E0" w="80vw" px={8} py={4} minHeight="70vh" borderRadius="8">
            {currentDisplayedData.sort().reverse().map((item, index) => {
                return <LeaderboardEntry key={item.uuid} index={index+1} name={item.userId} points={item.points}/>
            })}
        </Box>
    </Flex>)
}

export default Leaderboard