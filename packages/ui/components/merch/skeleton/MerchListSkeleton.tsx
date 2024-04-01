import { Grid, Skeleton, SkeletonText, GridItem } from "@chakra-ui/react";

export const MerchListSkeleton: () => JSX.Element = () => {
  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
      columnGap={4}
      rowGap={2}
    >
      {new Array(8).fill(null).map((_, i: number) => (
        <GridItem role="group" cursor="pointer" mt={4} key={i}>
          <Skeleton h={{ base: 250 }} width="100%" />
          <SkeletonText mt={4} noOfLines={2} spacing="4" />
        </GridItem>
      ))}
    </Grid>
  );
};
