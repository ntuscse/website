import ProfileChallengeLayout from "@/features/challenges/components/ProfileChallengeLayout"
import { useChallengesAuth } from "@/features/challenges/context/AuthContext"
import { AbsoluteCenter, Avatar, Box, Button, Center, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"

const user: Profile = { username: 'Eren Yeager', email: 'eren@aot.com', profilePicUrl: 'https://i.pinimg.com/474x/f8/6f/c4/f86fc4f39be083b5705a40de4c998b47.jpg' }
const challengesInProgressList: ChallengeDetail[] = [{ challengeId: 123, challengeName: "FizzBuzz" }, { challengeId: 124, challengeName: "FizzBuzz" }, { challengeId: 125, challengeName: "FizzBuzz" }, { challengeId: 126, challengeName: "FizzBuzz" }]
const challengesDone: ChallengeDetail[] = [{ challengeId: 223, challengeName: "Two Sum" }, { challengeId: 21, challengeName: "Two Sum" }, { challengeId: 12, challengeName: "Two Sum" }]

interface Profile {
    username: string,
    email: string,
    profilePicUrl: string
}

interface ChallengeDetail {
    challengeId: number,
    challengeName: string
}
function paginateData(data: ChallengeDetail[], numItemsPerPage: number): ChallengeDetail[][] {
    const data2D: ChallengeDetail[][] = []
    for (var i = 0; i < data.length; i += numItemsPerPage) {
        data2D.push(data.slice(i, i + numItemsPerPage))
    }
    return data2D
}

interface PaginationButtonProps {
    onClick: () => void
    variant?: string
    text: string
}
const PaginationButton = ({ onClick, variant = 'primary-blue', text }: PaginationButtonProps) => {

    return <Button onClick={onClick} variant={variant} size={['sm', 'md']} _hover={{ bg: variant }} mx={4}>{text}</Button>
}
const numOfItemsPerPage = 3
const numOfChallengesInProgressPages = Math.ceil(challengesInProgressList.length / numOfItemsPerPage)
const paginatedChallengesInProgress = paginateData(challengesInProgressList, numOfItemsPerPage)
const paginatedHistory = paginateData(challengesDone, numOfItemsPerPage)
const Profile = () => {
    const { isLogin } = useChallengesAuth()
    const [currentChallengeInProgressPage, setCurrentChallengeInProgressPage] = useState(0)
    const [currentDisplayedChallengesInProgress, setCurrentDisplayedChallengeInProgress] = useState(paginatedChallengesInProgress[currentChallengeInProgressPage])

    const [currentHistoryPage, setCurrentHistoryPage] = useState(0)
    const [currentDisplayedHistoryPage, setCurrentDisplayedHistoryPage] = useState(paginatedHistory[currentHistoryPage])
    function onResumeClick(challengeId: number) {
        // navigate to challenge page given id
        console.log(`challengeId: ${challengeId}`)
    }

    function onDetailClick(challengeId: number) {
        // go to page with challenge details
        console.log(`challengeId: ${challengeId}`)

    }

    function goToChallengesInProgressPage(index: number) {
        let toSet = index
        if (index < 0) toSet = 0
        else if (index > numOfChallengesInProgressPages - 1) toSet = numOfChallengesInProgressPages - 1
        setCurrentChallengeInProgressPage(toSet)
        setCurrentDisplayedChallengeInProgress(paginatedChallengesInProgress[toSet])
    }

    function goToHistoryPage(index: number) {
        let toSet = index
        if (index < 0) toSet = 0
        else if (index > numOfChallengesInProgressPages - 1) toSet = numOfChallengesInProgressPages - 1
        setCurrentHistoryPage(toSet)
        setCurrentDisplayedHistoryPage(paginatedChallengesInProgress[toSet])
    }

    return ( isLogin ? <Flex
        minH="100vh"
        flexDir={['column', 'row']}
        justifyContent="center"
        alignItems="center">
        <Flex px={4} flexDirection="column" justifyContent="center" alignItems="center" flex={1} minH="100vh">
        <Flex flexDirection="column" alignItems="center" w="80%">
        <Avatar src={user.profilePicUrl} size={['xl', '2xl']} />
            <Text w={["100%", "50%"]} my={4}>Username: {user.username}</Text>
            <Text w={["100%", "50%"]}>NTU email: {user.email}</Text>
        </Flex>
        </Flex>

        <Flex flex={2} minH="100vh" justifyContent="center" alignItems="center" flexDirection="column">
            <Flex flexDirection="column" h={["50vh", "35vh"]} w={["100vw", "100%"]} alignItems={["center", "flex-start"]}>
                <Text mb={2} fontSize="2xl">Challenges in Progress</Text>
                <Flex flexDirection="column" justifyContent="space-between" height="100%">
                    <Box>
                        {currentDisplayedChallengesInProgress.map((challengeDetail) =>
                            <ProfileChallengeLayout key={challengeDetail.challengeId} challengeId={challengeDetail.challengeId} challengeName={challengeDetail.challengeName} onClick={() => { onResumeClick(challengeDetail.challengeId) }} buttonText="Resume" />
                        )}
                    </Box>

                    <Flex justifyContent="center">
                        <PaginationButton onClick={() => { goToChallengesInProgressPage(currentChallengeInProgressPage - 1) }} text="<" />

                        {Array.from(Array(numOfChallengesInProgressPages).keys()).map((index) => <PaginationButton onClick={() => { goToChallengesInProgressPage(index) }} variant={currentChallengeInProgressPage == index ? 'primary-black' : 'primary-blue'} text={(index + 1).toString()} />)}

                        <PaginationButton onClick={() => { goToChallengesInProgressPage(currentChallengeInProgressPage + 1) }} text=">" />
                    </Flex>
                </Flex>

            </Flex>

            <Flex flexDirection="column" h={["50vh", "35vh"]} w={["100vw", "100%"]} alignItems={["center", "flex-start"]}>
                <Text mb={2} fontSize="2xl">History</Text>
                <Flex flexDirection="column" justifyContent="space-between" height="100%">
                    <Box>
                        {currentDisplayedHistoryPage.map((challengeDetail) =>
                            <ProfileChallengeLayout key={challengeDetail.challengeId} challengeId={challengeDetail.challengeId} challengeName={challengeDetail.challengeName} onClick={() => { onDetailClick(challengeDetail.challengeId) }} buttonText="Details" />
                        )}
                    </Box>
                    <Flex justifyContent="center">
                        <PaginationButton onClick={() => { goToHistoryPage(currentHistoryPage - 1) }} text="<" />

                        {Array.from(Array(numOfChallengesInProgressPages).keys()).map((index) => <PaginationButton onClick={() => { goToHistoryPage(index) }} variant={currentHistoryPage == index ? 'primary-black' : 'primary-blue'} text={(index + 1).toString()} />)}

                        <PaginationButton onClick={() => { goToHistoryPage(currentHistoryPage + 1) }} text=">" />
                    </Flex>

                </Flex>

            </Flex>

        </Flex>
    </Flex> : <Flex
        minH="100vh"
        flexDir={['column', 'row']}
        justifyContent="center"
        alignItems="center">Not Logged In</Flex>)
}

export default Profile