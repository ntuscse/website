import { Flex, Text } from "@chakra-ui/react"

interface LeaderboardEntryProps {
    index: number,
    name: string,
    points: number
}

export const LeaderboardEntry = ({ index, name, points }: LeaderboardEntryProps) => {
    return (<Flex justify="space-evenly" py={1} >
        <Flex justify="start" align="center" alignItems="center" w="80%">
            <Text w="10%" textAlign="center">{index}</Text>
            <Text w="90%" textAlign="start">{name}</Text>
        </Flex>
        <Flex w="20%" justify="end">
            <Text>{points}</Text>
        </Flex>
    </Flex>
    )

}