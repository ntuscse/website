import { Box, Flex, Select } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ProblemListTable } from "@/features/challenges/components/ProblemListingTable";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Season {
  _id: string,
  title: string,
  start_date: Date,
  end_date: Date
}

type ProblemListData = {
  uuid: number;
  problem: string;
  title: string;
  point: number;
  solved: number;
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
  const [data, setData] = useState<ProblemListData[]>([])
  const [seasons, setSeasons] = useState<Season[]>([])

  function updateSeasonProblems(seasonID: string) {
    const url = `http://localhost:3000/api/seasons/${seasonID}/questions`
    fetch(url)
      .then((res: Response) => {
        return res.json()})
    .then((res: any) => {
      let probs: ProblemListData[] = res.map((ele: any) => { 
        return {uuid: ele._id, problem: ele.question_no, title: ele.question_title, point: ele.points, solved: ele.correct_submissions_count } as ProblemListData}
        )
        setData(probs)
      })

  }

  useEffect(() => {
    fetch("http://localhost:3000/api/seasons/")
    .then((res: Response) => {
      return res.json()
    })
    .then((res: any) => {
      let seasons: Season[] = res.seasons
      setSeasons(seasons)
      updateSeasonProblems(seasons[0]._id)
    })
   
  }, []);

  const handleOptionChange = (event: { target: { value: string } }) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
    updateSeasonProblems(selectedOption)
  };


  return (
    <Flex
      minH="100vh"
      pt={24}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Select
        w="80vw"
        my={4}
        bg="#CBD5F0"
        onChange={handleOptionChange}
        value={option}
      >
        {seasons.map((season: Season) => (
          <option key={season._id} value={season._id}>
            {season.title}
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
        <ProblemListTable columns={columns} data={data} />
      </Box>
    </Flex>
  );
};

export default Problems;
