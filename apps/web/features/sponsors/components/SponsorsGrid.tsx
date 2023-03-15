import { Box, Link, SimpleGrid } from "@chakra-ui/react";
import { sponsorsDataProps } from "@/features/sponsors/api";
import { Image } from "ui";

interface SponsorsGridProps {
  sponsorsData: sponsorsDataProps["data"]
}

export const SponsorsGrid = (props: SponsorsGridProps) => {
  const { sponsorsData } = props;

  return (
    <Box>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing={["30px", "50px", "150px"]}
        marginBottom="5rem"
        marginTop="3rem"
      >
        {sponsorsData.map(({ imageSrc, altText, href }) => (
          <Box key={altText} width="250px" height="100px" mx={4}>
            <Link href={href}>
              <Image
                height={100}
                width={250}
                src={imageSrc}
                alt={altText}
                style={{
                  objectFit: "contain",
                  height: "100px",
                  width: "250px",
                }}
              />
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
};
