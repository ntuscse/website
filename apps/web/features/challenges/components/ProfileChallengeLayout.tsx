import { Flex, Text, Button } from "@chakra-ui/react"

interface ProfileChallengeLayoutProps {
    challengeId: number,
    challengeName: string,
    onClick: () => void,
    buttonText: string
}
const ProfileChallengeLayout = ({challengeId, challengeName, onClick, buttonText} : ProfileChallengeLayoutProps) => {
    return <Flex mb={2} justifyContent="space-between" w={["85vw", "50vw"]} background="gray.300" p={4} borderRadius={8}>
        <Text>{challengeId}. {challengeName}</Text>
        <Button size="sm" onClick={() => {onClick()}}>{buttonText}</Button>
    </Flex>

}

export default ProfileChallengeLayout