import { Avatar, Flex, Text } from "@chakra-ui/react"

interface Profile {
    username: string,
    email: string,
    profilePicUrl: string
}

const Profile = () => {
    const user : Profile = {username: 'Eren Yeager', email: 'eren@aot.com', profilePicUrl: 'https://i.pinimg.com/474x/f8/6f/c4/f86fc4f39be083b5705a40de4c998b47.jpg'}
    return (<Flex
        minH="100vh"
        flexDir={['column', 'row']}
        justifyContent="center"
        alignItems="center">
        <Flex px={4} flexDirection="column" justifyContent="center" alignItems="center" flex={1} minH="100vh">
            <Avatar src={user.profilePicUrl} size={['xl', '2xl']}/>
            <Text w={["100%", "50%"]} my={4}>Username: {user.username}</Text>
            <Text w={["100%", "50%"]}>NTU email: {user.email}</Text>

        </Flex>
        <Flex flex={2} minH="100vh"></Flex>
    </Flex>)
}

export default Profile