import React from "react";
import {
  Grid,
  Skeleton,
  SkeletonText,
  GridItem,
  Box,
  Flex,
} from "@chakra-ui/react";

const ItemSkeleton: React.FC = () => (
  <Flex mt={4} alignItems="center" gap={2}>
    <Skeleton h={10} w={10} />
    <SkeletonText noOfLines={2} spacing="4" w="100%" />
  </Flex>
);

const CheckoutSkeleton: React.FC = () => {
  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      rowGap={[4, 0]}
      columnGap={[0, 4]}
    >
      <GridItem px={[0, 4]} colSpan={1} mb={8}>
        <Box borderWidth={1} borderRadius="lg" p={[4, 6]} boxShadow="md">
          <Skeleton width="50%" height={6} />
          <Skeleton width="65%" height={8} mt={2} mb={4} />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </Box>
      </GridItem>
      <GridItem px={[0, 4]} colSpan={1}>
        <Skeleton width="60%" height={10} />
        <Skeleton width="85%" height={12} mt={2} mb={4} />
        <Skeleton width="80%" height={14} />
        <Skeleton width="85%" height={12} mt={2} mb={4} />
        <Skeleton width="80%" height={14} />
      </GridItem>
    </Grid>
  );
};

export default CheckoutSkeleton;
