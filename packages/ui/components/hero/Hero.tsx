import { Stack, Flex, Text, VStack, FlexProps, TextProps } from '@chakra-ui/react';
import { Button, ButtonProps } from "ui"

export interface HeroProps extends FlexProps {
    backgroundImage: string
    backgroundGradient?: string
    buttons?: Array<ButtonProps>
    text?: string
    textProps?: TextProps
}

export const Hero = ({ backgroundImage, backgroundGradient = '', buttons, text, textProps, ...flexProps }: HeroProps) => {
    return (
        // Background Image
        <Flex
            w='full'
            h={{ base: '400px', md: '500px' }}
            backgroundImage={ backgroundImage }
            backgroundSize='cover'
            backgroundPosition='center center'
            { ...flexProps }>
            <VStack
                w='full'
                justify='center'
                px={{ base: 4, md: 8 }}
                bgGradient={ backgroundGradient }>

                {/* Content */}
                <Stack align='center'
                       justify='center'
                       textAlign='center'
                       spacing={ 6 }
                       width={{ base: '75%', md: '70%', lg: '65%' }}
                       height={{ base: '75%', md: '70%', lg: '50%' }}
                       padding={{ base: 5, md: 10, lg: 20 }}
                       bgColor={ text || buttons ? 'rgba(255,255,255,0.4)' : 'transparent' }
                       transitionDuration="200ms">
                    {/* Text */}
                    <Text
                        color='black'
                        fontWeight={ 700 }
                        fontFamily='Verdana'
                        lineHeight={ 1.2 }
                        fontSize={{ base: '32px', md: '48px' }}
                        { ...textProps }>
                        { text }
                    </Text>
                    {/* Buttons */}
                    <Stack direction={{ base: 'column', md: 'row' }} width='100%' justify='center'>
                        { buttons?.map(button => {
                            const { label, href, buttonType, ...buttonProps } = button;
                            return (
                                <Button
                                    key={ label }
                                    label={ label }
                                    href={ href }
                                    buttonType={ buttonType }
                                    size='lg'
                                    width={{ base: '100%', md: 'auto' }}
                                    { ...buttonProps } />
                            )
                        })}
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
    );
}