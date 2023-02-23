import React from "react";
import { Flex } from "@chakra-ui/react";
import { Announcement, AnnouncementProps } from "./Announcement";

export interface FooterContentTextProps {
  announcements: Array<AnnouncementProps>;
}

export const FooterContentText = ({
  announcements,
}: FooterContentTextProps) => {
  return (
    <Flex
      bg="black"
      alignSelf="flex-start"
      alignItems="center"
      px="20px"
      pb="30px"
      flexDirection="column"
    >
      {announcements.map((announcement) => (
        <Announcement
          key={announcement.title}
          title={announcement.title}
          description={announcement.description}
        />
      ))}
    </Flex>
  );
};
