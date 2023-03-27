import React from "react";
import { Flex, Skeleton, Divider, GridItem, Grid } from "@chakra-ui/react";

export const MerchDetailSkeleton: React.FC = () => {
  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}>
      <GridItem colSpan={2} px={[0, 4]}>
        <Skeleton height="300px" width="100%" />
      </GridItem>
      <GridItem colSpan={3} px={[0, 4]}>
        <Flex gap={2} flexDirection="column">
          <Skeleton height="42px" width={250} />
          <Skeleton height="28px" width={100} />
        </Flex>
        <Divider mt={4} mb={6} />
        <Skeleton height="42px" />
        <Skeleton height="42px" />
        <Divider my={6} />
        <Flex justifyContent="space-between" gap={2}>
          <Skeleton height="42px" w="50%" />
          <Skeleton height="42px" w="50%" />
        </Flex>
        <Divider my={6} />
        <Skeleton width="100%" height="150px" />
      </GridItem>
    </Grid>
  );
};