/*
TODO
Pagination
-----------------
[x] Fetch season data when dropdown is selected
[x] Get next page when PaginationButton is clicked
[ ] Fetch active season
[ ] Display correct ranking 
*/


import LeaderboardEntry from "@/features/challenges/components/LeaderboardEntry"
import { Box, Button, Flex, Select } from "@chakra-ui/react"
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

// button styling
interface PaginationButtonProps {
    onClick: () => void
    variant?: string
    text: string
}

const PaginationButton = ({ onClick, variant = 'primary-blue', text }: PaginationButtonProps) => {
    return <Button onClick={onClick} variant={variant} size={['sm', 'md']} _hover={{ bg: variant }} mx={4}>{text}</Button>
}

function findSeason(seasonId: string, seasons: Season[]) {
    return seasons.find((ele) => ele._id == seasonId)
}

const Leaderboard = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [numOfPages, setNumOfPages] = useState(0)
    const [currentDisplayedData, setCurrentDisplayedData] = useState<LeaderboardData[]>()
    const [seasons, setSeasons] = useState<Season[]>()
    const [currentSeason, setCurrentSeason] = useState<Season>()

    function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // reset to first page when changing seasons
        setCurrentPage(0)
        if (seasons != undefined) {
            setCurrentSeason(findSeason(event.target.value, seasons))
            updateSeasonRanking(event.target.value)
        }
    }

    // get different season rankimg
    function updateSeasonRanking(seasonID: string) {
        const url = `http://localhost:3000/api/seasons/${seasonID}/rankings?page=0&limit=${numOfItemsPerPage}`
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

    // get paginated data
    function setCurrentPageData(seasonID: string, index: number) {
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
                setCurrentPage(index)
            })
    }

    function onPaginationButtonClick(index: number) {
        if (currentSeason != undefined && index >= 0 && index <= (numOfPages - 1)) {
            setCurrentPageData(currentSeason._id, index)
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
                updateSeasonRanking(seasons[0]._id)
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
            <PaginationButton onClick={() => { onPaginationButtonClick(currentPage - 1) }} text="<" />

            {Array.from(Array(numOfPages).keys()).map((index) => <PaginationButton key={index} onClick={() => { onPaginationButtonClick(index) }} variant={currentPage == index ? 'primary-black' : 'primary-blue'} text={(index + 1).toString()} />)}

            <PaginationButton onClick={() => { onPaginationButtonClick(currentPage + 1) }} text=">" />
        </Flex>

    </Flex>)
}

export default Leaderboard