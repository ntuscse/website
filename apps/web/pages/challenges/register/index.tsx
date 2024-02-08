import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { useState } from "react"



const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    function handleRegister(email: string, password: string) {
        // TODO: submit register details
        if (!email.endsWith("@e.ntu.edu.sg")) { setIsEmailError(true) }
        else if (isEmailError) { setIsEmailError(false)}

        if (password.length < 8) {setIsPasswordError(true) }
        else if (isPasswordError) { setIsPasswordError(false) }

        
    }
    return (<Flex minH="100vh" pt={24} flexDirection="column" alignItems="center" justifyContent="center">
    
            <Flex w={["100vw", "30vw"]} h="50vh" p={8} flexDirection="column" alignItems="center" borderRadius={8} justifyContent="center" boxShadow={["", "lg"]}>

                <Heading>REGISTER</Heading>
                <Text>Have an account? Login here</Text>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input borderColor="black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={isEmailError} />
                 
                    {isEmailError ? <Text textColor="red">Invalid domain</Text> : <></>}
                </FormControl>

                <FormControl mt={2}>
                    <FormLabel>Password</FormLabel>
                    <Input borderColor="black" type="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={isPasswordError}/>
                    {isPasswordError ? <Text textColor="red">Password is too weak</Text> : <></>}
                
                </FormControl>
                <Button my={10} w={"100%"} onClick={() => {handleRegister(email,password)}}>Register</Button>



            </Flex>
  



    </Flex>)
}

export default Register