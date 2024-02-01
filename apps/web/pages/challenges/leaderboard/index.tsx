/*
TODO
Pagination
-----------------
[x] Fetch season data when dropdown is selected
[x] Get next page when PaginationButton is clicked
[ ] Fetch active season
[ ] Display correct ranking 
*/


import { LeaderboardEntry, PaginationButton } from "@/features/challenges/components"
import { Box, Flex, Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const numOfItemsPerPage = 1

interface Season {
    _id: string,
    title: string,
    start_date: Date,
    end_date: Date
}

interface RankingResponse {
    _id: string,
    seasonID: string,
    userID: string,
    username: string,
    __v: number,
    createdAt: string,
    points: number,
    updatedAt: string
}

interface LeaderboardData {
    uuid: string,
    userId: string,
    username: string,
    points: number
}

function findSeason(seasonId: string, seasons: Season[]) {
    return seasons.find((ele) => ele._id == seasonId)
}

const Leaderboard = () => {
    const [currentDisplayedData, setCurrentDisplayedData] = useState<LeaderboardData[]>()
    const [currentPage, setCurrentPage] = useState(0)
    const [numOfPages, setNumOfPages] = useState(0)
    const [seasons, setSeasons] = useState<Season[]>()
    const [currentSeason, setCurrentSeason] = useState<Season>()

    // get different season / page ranking
    function updateSeasonRanking(seasonID: string, index: number) {
        const url = `http://localhost:3000/api/seasons/${seasonID}/rankings?page=${index}&limit=${numOfItemsPerPage}`
        fetch(url)
            .then((res: Response) => {
                return res.json()
            })
            .then((res: any) => {
                console.log(res)
                const currentSeasonData: LeaderboardData[] = res.rankings.map((ele: RankingResponse) => {
                    return { "uuid": ele._id, "userId": ele.userID, "username": ele.username, "points": ele.points }
                })
                setNumOfPages(res._metaData.pageCount)
                setCurrentDisplayedData(currentSeasonData)
            })
    }  
    
    function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // reset to first page when changing seasons
        setCurrentPage(0)
        if (seasons != undefined) {
            setCurrentSeason(findSeason(event.target.value, seasons))
            updateSeasonRanking(event.target.value, 0)
        }
    }

    function handlePaginationButtonClick(index: number) {
        if (currentSeason != undefined && index >= 0 && index <= (numOfPages - 1)) {
            updateSeasonRanking(currentSeason._id, index)
            setCurrentPage(index)
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/api/seasons/")
            .then((res: Response) => {
                return res.json()
            })
            .then((res: any) => {
                let seasons: Season[] = res.seasons
                setSeasons(seasons)
                setCurrentSeason(seasons[0])
                // replace with active season
                updateSeasonRanking(seasons[0]._id, 0)
            })

    }, [])

    return (<Flex
        minH="100vh"
        pt={24}
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Select bg="gray.300" borderColor="gray.300" w="80vw" my={4} onChange={handleDropdownChange}>
            {seasons?.map((season) => { return <option key={season._id} value={season._id}>{season.title}</option> })}
        </Select>

        <Box bg="gray.300" w="80vw" px={8} py={4} minHeight="70vh" borderRadius="8">
            {currentDisplayedData && currentDisplayedData.sort().reverse().map((item, index) => {
                return <LeaderboardEntry key={item.uuid} index={index + 1} name={item.username} points={item.points} />
            })}
        </Box>

        <Flex justifyContent='center' w="60vw" align="center" py={8}>
            <PaginationButton onClick={() => { handlePaginationButtonClick(currentPage - 1) }} text="<" />

            {Array.from(Array(numOfPages).keys()).map((index) => <PaginationButton key={index} onClick={() => { handlePaginationButtonClick(index) }} variant={currentPage == index ? 'primary-black' : 'primary-blue'} text={(index + 1).toString()} />)}

            <PaginationButton onClick={() => { handlePaginationButtonClick(currentPage + 1) }} text=">" />
        </Flex>

    </Flex>)
}

export default Leaderboard