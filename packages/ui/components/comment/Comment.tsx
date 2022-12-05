import {
    FormControl,
    FormLabel,
    Heading,
    AlertIcon,
    AlertDescription,
    Flex,
    Input,
    Alert,
    Textarea,
    Box,
    Button
} from "@chakra-ui/react";
import { useState } from "react";
import "@fontsource/inter";
import "@fontsource/inder";

export interface CommentProps {}

interface commentType {
    name: string,
    email: string,
    comment: string
}

export const Comment = (_props: CommentProps) => {
    const [commentData, setCommentData] = useState<commentType>({ name: '', email: '', comment: '' })
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCommentData({ name: '', email: '', comment: '' });
        setShowAlert(true);
    }

    return (
        <Box w='801px' h='457px'>
            {showAlert ? (<Alert status='success'>
                <AlertIcon />
                <AlertDescription>The comment has been posted!</AlertDescription>
            </Alert>) : <Box></Box>}
            <Heading fontSize='48px' fontWeight={'400px'} fontFamily={"Inder"}>Leave a comment</Heading>
            <Heading mt='29px' fontSize='24px' fontWeight={'400px'} fontFamily={"Inder"}>Your email address will not be published. Required fields are marked *</Heading>
            <Box fontFamily={"Inter"}>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <Flex flexDirection='row' mt='59px' mb='29px' fontWeight={'500px'}>
                            <Flex flexDirection='column' mr='54px'>
                            <FormLabel>Name *</FormLabel>
                            <Input w='320px'  placeholder='Your Name' type='text' required value={commentData.name} onChange={(e) => {setCommentData({ ...commentData, name: e.target.value })}} />
                            </Flex>
                            <Flex flexDirection='column'>
                            <FormLabel>Email *</FormLabel>
                            <Input w='320px' placeholder='eg. scse@ntu.edu.sg' type='email' required value={commentData.email} onChange={(e) => {setCommentData({ ...commentData, email: e.target.value })}} />
                            </Flex>
                        </Flex>
                        <FormLabel>Comment *</FormLabel>
                        <Textarea w='694px' placeholder='Your Comment' required value={commentData.comment} onChange={(e) => {setCommentData({ ...commentData, comment: e.target.value })}}/>
                    </FormControl>
                    <Button type='submit' mt={'29'} h={'48px'} w={'177px'}><Box fontWeight={'600px'}>Post Comment</Box> </Button>
                </form>
            </Box>
        </Box>



    )
}