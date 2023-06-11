import React, { useState } from "react";
import { Flex, Divider, Select, Heading, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Card, MerchListSkeleton, Page } from "ui/components/merch";
import { QueryKeys } from "features/merch/constants";
import { api } from "features/merch/services/api";
import { Product } from "types/lib/merch";
import { isOutOfStock } from "features/merch/functions";

const MerchandiseList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: products, isLoading } = useQuery(
    [QueryKeys.PRODUCTS],
    () => api.getProducts(),
    {}
  );

  const categories = products?.map((product: Product) => product?.category);
  const uniqueCategories = categories
    ?.filter((c, idx) => categories.indexOf(c) === idx)
    .filter(Boolean);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Page>
      <Flex justifyContent="space-between" my={5} alignItems="center">
        <Heading fontSize={["md", "2xl"]} textColor={["primary.600", "black"]}>
          New Drop
        </Heading>
        <Select
          bgColor={["white", "gray.100"]}
          w="fit-content"
          textAlign="center"
          alignSelf="center"
          placeholder="All Product Type"
          size="sm"
          disabled={isLoading}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {uniqueCategories?.map((category, idx) => (
            <option key={idx.toString()} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Flex>
      <Divider borderColor="blackAlpha.500" mt={[5, 10]} />
      {isLoading ? (
        <MerchListSkeleton />
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          columnGap={4}
          rowGap={2}
        >
          {products
            ?.filter((product: Product) => {
              if (!product?.is_available) return false;
              if (selectedCategory === "") return true;
              return product?.category === selectedCategory;
            })
            ?.map((item: Product, idx: number) => (
              <Card
                _productId={item.id}
                key={idx.toString()}
                text={item?.name}
                price={item?.price}
                imgSrc={item?.images?.[0]}
                sizeRange={`${item?.sizes?.[0]} - ${
                  item.sizes?.[item.sizes.length - 1]
                }`}
                isOutOfStock={isOutOfStock(item)}
              />
            ))}
        </Grid>
      )}
    </Page>
  );
};

export default MerchandiseList;
