import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { QueryKeys } from "features/merch/constants";
import { useQuery } from "@tanstack/react-query";
import { api } from "features/merch/services/api";
import { MerchListSkeleton, Page } from "ui/components/merch";

interface MerchLayoutProps {
  children: React.ReactNode;
}

export const MerchLayout = ({ children }: MerchLayoutProps) => {
  const { data: status, isLoading: isStatusLoading } = useQuery(
    [QueryKeys.STATUS],
    () => api.getMerchSaleStatus(),
    {}
  );

  const displayText = status?.displayText;
  const disabled = status?.disabled;

  if (isStatusLoading) {
    return <Page>{<MerchListSkeleton /> ?? <></>}</Page>;
  }

  return (
    <>
      {disabled ? (
        <Flex justifyContent="center" alignItems="center" height="85vh">
          <Heading textAlign="center" maxWidth="1260px">
            {displayText}
          </Heading>
        </Flex>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
