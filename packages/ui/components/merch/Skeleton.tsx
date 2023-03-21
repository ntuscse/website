import React from "react";
import { Grid, Skeleton, SkeletonText, GridItem } from "@chakra-ui/react";

const ProductListSkeleton: React.FC = () => {
  return (
    <Grid templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} columnGap={4} rowGap={2}>
      {new Array(8).fill(null).map((item: any) => (
        <GridItem role="group" cursor="pointer" mt={4}>
          <Skeleton h={{ base: 250 }} width="100%" />
          <SkeletonText mt={4} noOfLines={2} spacing="4" />
          {item}
        </GridItem>
      ))}
    </Grid>
  );
};

export default ProductListSkeleton;
