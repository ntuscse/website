import { Button, Flex, FormControl, FormLabel, Heading, Input, Spacer, Text } from "@chakra-ui/react"

const Login = () => {
    return (<Flex minH="100vh" pt={24} flexDirection="column" alignItems="center" justifyContent="center">
        <Flex w={["100vw", "30vw"]} h="50vh" p={8} flexDirection="column" alignItems="center" borderRadius={8} justifyContent="center" boxShadow={["", "lg"]}>
        <Heading>LOGIN</Heading>
        <Text>Don't have an account? Sign up</Text>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input borderColor="black" type="email"/>
        </FormControl>

        <FormControl mt={2}>
            <FormLabel>Password</FormLabel>
            <Input borderColor="black" type="password"/>
        </FormControl>
        <Button my={10} w={"100%"} >Login</Button>
        </Flex>
        


    </Flex>)
}

export default Login