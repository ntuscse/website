import React from 'react'
import { Box } from '@chakra-ui/react';
import { Announcement, AnnouncementProps } from './Announcement';

export interface FooterContentTextProps {
    alerts: Array<AnnouncementProps>
}

export const FooterContentText = ( { alerts } : FooterContentTextProps) => {
    return (
        <Box alignSelf='flex-start' px='20px' pb='30px'>
            { alerts.map(alert => (
                <Announcement key={alert.title} title={alert.title} description={alert.description} />
            ))}
        </Box>
    )
}