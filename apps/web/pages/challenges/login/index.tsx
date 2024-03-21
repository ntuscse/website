import { Button, Flex, FormControl, FormLabel, Heading, Input, Spacer, Text } from "@chakra-ui/react"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "default"
const anon_key =  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "default"

async function signInWithAzure() {
  const supabase = createClient(supabase_url, anon_key)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
        redirectTo: 'http://localhost:3001/challenges'
      },
    })
  }
const Login = () => {
    
    return (<Flex minH="100vh" pt={24} flexDirection="column" alignItems="center" justifyContent="center">
    
        <Button onClick={signInWithAzure}>Sign in with Microsoft</Button>
        

    </Flex>)
}

export default Login