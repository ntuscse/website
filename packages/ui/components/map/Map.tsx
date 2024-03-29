import { Flex, AspectRatio } from "@chakra-ui/react";

export enum MapEnums {
  NTUMap = "NTUMap",
}

export interface MapProps {
  title: string;
  map: MapEnums
}

export const Map = ({ title, map }: MapProps) => {
  switch (map) {
    case MapEnums.NTUMap:
      return <NTUMap title={title} />
  }
  return <></>;
};

// ---------- Specific Maps ---------- //
interface IMap {
  title: string;
}

const NTUMap = ({ title }: IMap) => {
  return (
    <Flex
      bgGradient="linear(to-t,black 48%,transparent 45%)"
      filter="brightness( 100% ) contrast( 100% ) saturate( 0% ) blur( 0px ) hue-rotate( 0deg )"
      w="100%"
      m="0px"
      p="20px"
      align="center"
      justify="space-between"
      lineHeight="1"
      border="none"
      alignItems="center"
      justifyContent="center"
    >
      <AspectRatio h="400px" w="100%" maxW="1140px">
        <iframe
          src="https://maps.google.com/maps?q=Nanyang%20Technological%20University&amp;t=m&amp;z=12&amp;output=embed&amp;iwloc=near"
          title={title}
          aria-label={title}
        />
      </AspectRatio>
    </Flex>
  );
};
