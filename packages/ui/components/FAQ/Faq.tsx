import Qna from './Qna';
import {Flex, Center, Heading} from "@chakra-ui/react";

function Faq(){
    return (
        <Center
            paddingLeft={'20px'}
            paddingRight={'20px'}
            paddingTop={'80px'}
            paddingBottom={'80px'}>
            <Flex
                // borderWidth={'1px'}
                borderColor={'red'}
                flexDirection={'column'}
                padding={'20px'}
                marginLeft={'10%'}
                marginRight={'10%'}
                // marginRight={'171.5px'}
            >
                <Heading
                    // borderWidth={'1px'}
                    textAlign={'center'}
                    padding={'20px'}
                    marginBottom={'20px'}
                    fontSize={'3xl'}
                    as={'b'}>
                    Frequently Asked Questions
                </Heading>
                <Flex
                    flexDirection={'row'}
                    justifyContent={'center'}
                    flexGrow={'wrap'}
                    flexFlow={'row wrap'}
                >
                    <Qna/>
                    <Qna/>
                    <Qna/>
                    <Qna/>
                </Flex>
            </Flex>
        </Center>
    )
}

export default Faq;
