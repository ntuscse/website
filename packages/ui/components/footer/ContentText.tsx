import React from 'react'
import { Box } from '@chakra-ui/react';
import { Update, UpdateProps } from './Update';

export interface ContentTextProps {
    alerts: Array<UpdateProps>
}

export const ContentText = ( { alerts } : ContentTextProps) => {
    return (
        <Box alignSelf='flex-start' px='20px' pb='30px'>
            { alerts.map(alert => (
                <Update key={alert.title} title={alert.title} description={alert.description} />
            ))}
        </Box>
    )
}