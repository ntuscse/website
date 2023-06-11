import { Box, Grid, Heading } from "@chakra-ui/react";

export const CartHeader = () => {
  return (
    <Box bg="primary-blue" borderRadius="md" borderWidth={1} py={4}>
      <Grid templateColumns="5fr repeat(3, 2fr) 1fr">
        <Heading size="sm" ml={2}>
          Product
        </Heading>
        {["Unit Price", "Quantity", "Subtotal"].map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Heading textAlign="center" size="sm" key={index}>
            {item}
          </Heading>
        ))}
      </Grid>
    </Box>
  );
};
