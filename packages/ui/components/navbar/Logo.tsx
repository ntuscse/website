import { Box, Stack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { Image } from "../image";

export interface LogoProps {
  src: string;
  alt: string;
}

export const Logo = ({ src, alt }: LogoProps) => {
  return (
    <Link 
      as={NextLink}
      href="/" 
      _hover={{ textDecoration: "none" }}
    >
      <Stack align="center" justify={"flex-start"} direction={"row"}>
        <Box
          minWidth={{ base: 75, md: 100 }}
          maxWidth={{ base: 75, md: 100 }}
          transitionDuration="200ms"
        >
          <Image src={src} alt={alt} width={100} height={100} />
        </Box>
      </Stack>
    </Link>
  );
};
