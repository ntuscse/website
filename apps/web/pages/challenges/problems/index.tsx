import { Box, Flex, Select } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ProblemListTable } from "@/features/challenges/components/ProblemListingTable";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type ProblemListData = {
  uuid: number;
  problem: string;
  title: string;
  point: number;
  solved: number;
};

// dummy data for multiple season
const seasonsData: Record<string, ProblemListData[]> = {
  season1: [
    {
      uuid: 1001,
      problem: "A",
      title: "longest substring",
      point: 500,
      solved: 10,
    },
    {
      uuid: 1002,
      problem: "B",
      title: "3 sum",
      point: 300,
      solved: 15,
    },
    {
      uuid: 1003,
      problem: "C",
      title: "minimum spanning tree",
      point: 400,
      solved: 30,
    },
  ],

  season2: [
    {
      uuid: 1004,
      problem: "A",
      title: "binary tree",
      point: 200,
      solved: 100,
    },
    {
      uuid: 1005,
      problem: "B",
      title: "panlindrome",
      point: 100,
      solved: 1500,
    },
  ],
};

const columnHelper = createColumnHelper<ProblemListData>();

const columns = [
  columnHelper.accessor("problem", {
    cell: (prop) => prop.getValue(),
    header: "#",
  }),
  columnHelper.accessor("title", {
    cell: (prop) => (
      <span>
        <Link href={"/challenges/problems/submission"}>{prop.getValue()}</Link>
      </span>
    ),
    header: "Title",
  }),
  columnHelper.accessor("point", {
    cell: (prop) => prop.getValue(),
    header: "Points",
  }),
  columnHelper.accessor("solved", {
    cell: (prop) => prop.getValue(),
    header: "Solved",
  }),
];

const Problems = () => {
  const [option, setOption] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { season } = router.query;
    if (season) setOption(season as string);
  }, [router.query]);

  const handleOptionChange = (event: { target: { value: string } }) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
    router.push(`/challenges/problems?season=${String(selectedOption)}`);
  };

  const selectedSeasonData = seasonsData[option] || [];

  return (
    <Flex
      minH="100vh"
      pt={24}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Select
        placeholder="Select Season"
        w="80vw"
        my={4}
        bg="#CBD5F0"
        onChange={handleOptionChange}
        value={option}
      >
        {Object.keys(seasonsData).map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </Select>
      <Box
        bg="#CBD5F0"
        w="80vw"
        px={8}
        py={4}
        mb={10}
        minHeight="70vh"
        borderRadius="8"
      >
        <ProblemListTable columns={columns} data={selectedSeasonData} />
      </Box>
    </Flex>
  );
};

export default Problems;
