import ProfileChallengeLayout from "@/features/challenges/components/ProfileChallengeLayout"
import { Avatar, Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react"

interface Profile {
    username: string,
    email: string,
    profilePicUrl: string
}

interface ChallengeDetail {
    challengeId: number,
    challengeName: string
}
const Profile = () => {
    const user: Profile = { username: 'Eren Yeager', email: 'eren@aot.com', profilePicUrl: 'https://i.pinimg.com/474x/f8/6f/c4/f86fc4f39be083b5705a40de4c998b47.jpg' }
    const challengesInProgressList: ChallengeDetail[] = [{ challengeId: 123, challengeName: "FizzBuzz" }, { challengeId: 123, challengeName: "FizzBuzz" }, { challengeId: 12, challengeName: "FizzBuzz" }]
    const challengesDone: ChallengeDetail[] = [{challengeId: 456, challengeName: "Two Sum"}, {challengeId: 456, challengeName: "Two Sum"}, {challengeId: 456, challengeName: "Two Sum"}]
    function onResumeClick(challengeId: number) {
        // navigate to challenge page given id
        console.log(`challengeId: ${challengeId}`)
    }

    function onDetailClick(challengeId: number) {
        // go to page with challenge details
        console.log(`challengeId: ${challengeId}`)

    }
    return (<Flex
        minH="100vh"
        flexDir={['column', 'row']}
        justifyContent="center"
        alignItems="center">
        <Flex px={4} flexDirection="column" justifyContent="center" alignItems="center" flex={1} minH="100vh">
            <Avatar src={user.profilePicUrl} size={['xl', '2xl']} />
            <Text w={["100%", "50%"]} my={4}>Username: {user.username}</Text>
            <Text w={["100%", "50%"]}>NTU email: {user.email}</Text>
        </Flex>

        <Flex flex={2} minH="100vh" justifyContent="space-evenly" alignItems="center" flexDirection="column">
            <Flex flexDirection="column" h={["50vh", "30vh"]} w={["100vw", "100%"]} alignItems={["center", "flex-start"]}>
                <Text mb={2} fontSize="2xl">Challenges in Progress</Text>
                {challengesInProgressList.map((challengeDetail) =>
                    <ProfileChallengeLayout challengeId={challengeDetail.challengeId} challengeName={challengeDetail.challengeName} onClick={() => { onResumeClick(challengeDetail.challengeId) }} buttonText="Resume" />
                )}
            </Flex>

            <Flex flexDirection="column" h={["50vh", "30vh"]} w={["100vw", "100%"]} alignItems={["center", "flex-start"]}>
                <Text mb={2} fontSize="2xl">History</Text>
                {challengesDone.map((challengeDetail) =>
                    <ProfileChallengeLayout challengeId={challengeDetail.challengeId} challengeName={challengeDetail.challengeName} onClick={() => { onDetailClick(challengeDetail.challengeId) }} buttonText="Details" />
                )}
            </Flex>

        </Flex>
    </Flex>)
}

export default Profile