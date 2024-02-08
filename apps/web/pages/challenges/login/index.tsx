import { Button, Flex, FormControl, FormLabel, Heading, Input, Spacer, Text } from "@chakra-ui/react"
import { useState } from "react"



const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    function handleLogin(username: string, password: string) {
        // TODO: submit login details
    }
    return (<Flex minH="100vh" pt={24} flexDirection="column" alignItems="center" justifyContent="center">
    
            <Flex w={["100vw", "30vw"]} h="50vh" p={8} flexDirection="column" alignItems="center" borderRadius={8} justifyContent="center" boxShadow={["", "lg"]}>

                <Heading>LOGIN</Heading>
                <Text>Don't have an account? Sign up</Text>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input borderColor="black" type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormControl>

                <FormControl mt={2}>
                    <FormLabel>Password</FormLabel>
                    <Input borderColor="black" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormControl>
                <Button my={10} w={"100%"} onClick={() => {handleLogin(username,password)}}>Login</Button>



            </Flex>
  



    </Flex>)
}

export default Login