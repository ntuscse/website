import {Text, Flex, Heading} from "@chakra-ui/react";
function qna(props : any){

    const defaultQuestion='What is the level required?';
    const defaultAnswer=`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or
     web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have.`;


    return (
        <Flex
            borderColor={'blue'}
            justifyContent={'center'}
            flexDirection={'column'}
            maxWidth={'50%'}
            marginBottom={'30px'}
            padding={'20px'}
        >
            <Heading textAlign={'left'} fontSize={'2xl'} as={'b'} marginBottom={'10px'}>{props.question ? props.question : defaultQuestion}</Heading>
            <Text textAlign={'left'} fontSize={'l'} lineHeight={'2em'} letterSpacing={'0.8px'}>{props.answer ? props.answer : defaultAnswer}</Text>
        </Flex>

    )
}
export default qna
