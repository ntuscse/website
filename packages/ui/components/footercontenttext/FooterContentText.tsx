import React from 'react'
import { Box } from '@chakra-ui/react';
import { Announcement, AnnouncementProps } from './Announcement';

export interface FooterContentTextProps {
    announcements: Array<AnnouncementProps>
}

export const FooterContentText = ( { announcements } : FooterContentTextProps) => {
    return (
        <Box bg='black' alignSelf='flex-start' px='20px' pb='30px'>
            { announcements.map(announcement => (
                <Announcement key={announcement.title} title={announcement.title} description={announcement.description} />
            ))}
        </Box>
    )
}