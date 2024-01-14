import LeaderboardEntry from "@/features/challenges/components/LeaderboardEntry"
import { Box, Button, Flex, Select, Spacer, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Pagination } from "react-bootstrap"

// placeholder for API Response
let currentSeasonData: LeaderboardData[] = [
    { uuid: 1000, userId: "alex200", points: 100 },
    { uuid: 1001, userId: "johndoe010", points: 200 },
    { uuid: 1002, userId: "fwqdqw", points: 350 },
    { uuid: 1003, userId: "cwcqw", points: 350 },
    { uuid: 1004, userId: "dqwdq", points: 350 },
    { uuid: 1005, userId: "wqcqw", points: 350 },
    { uuid: 1006, userId: "cwqc", points: 350 },
]

interface LeaderboardData {
    uuid: number,
    userId: string,
    points: number
}

function paginateData(data: LeaderboardData[], numItemsPerPage: number) : LeaderboardData[][] {
    const data2D : LeaderboardData[][] = []
    for (var i = 0; i < data.length; i += numItemsPerPage) {
        data2D.push(data.slice(i, i + numItemsPerPage))
    }
    return data2D
}

interface PaginationButtonProps {
    onClick : () => void
    variant?: string
    text: string
}
const PaginationButton = ({onClick, variant = 'primary-blue', text} : PaginationButtonProps) => {
    
    return <Button onClick={onClick} variant={variant} size={['sm','md']} _hover={{bg: variant}} mx={4}>{text}</Button>
}

const numOfItemsPerPage = 3

const numOfPages = Math.ceil(currentSeasonData.length / numOfItemsPerPage)
const paginatedCurrentSeasonData = paginateData(currentSeasonData, numOfItemsPerPage)

const Leaderboard = () => {
    const [currentPage, setCurrentPage] = useState(0)
    
    const [currentDisplayedData, setCurrentDisplayedData] = useState(paginatedCurrentSeasonData[currentPage])
    function handleDataChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // fetch and update leaderboard
        setCurrentPage(0)
        switch (event.target.value) {
            case 'season-id-1':
                setCurrentDisplayedData(paginatedCurrentSeasonData[currentPage])
                break
        }
    
    }
    
     function goToPage(index: number) {
        let toSet = index
        if (index < 0) toSet = 0
        else if (index > numOfPages-1) toSet = numOfPages - 1
        console.log(`toSet: ${toSet}`)
        setCurrentPage(toSet)
        setCurrentDisplayedData(paginatedCurrentSeasonData[toSet])
     }

    return (<Flex
        minH="100vh"
        pt={24}
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
            <Select bg="gray.300" borderColor="gray.300" w="80vw" my={4} onChange={handleDataChange}>
                <option value='season-id-1'>Current Season</option>
                <option value='season-id-2'>Season 2</option>
            </Select>
        <Box bg="gray.300" w="80vw" px={8} py={4} minHeight="70vh" borderRadius="8">
            {currentDisplayedData.sort().reverse().map((item, index) => {
                return <LeaderboardEntry key={item.uuid} index={index+1} name={item.userId} points={item.points}/>
            })}
        </Box>
        <Flex justifyContent='center' w="60vw" align="center" py={8}>
            <PaginationButton onClick={() =>{goToPage(currentPage - 1)}} text="<"/>
      
            {Array.from(Array(numOfPages).keys()).map((index) => <PaginationButton onClick={() => {goToPage(index)}}  variant={currentPage == index ? 'primary-black' : 'primary-blue'} text={(index+1).toString()}/>)}
            
            <PaginationButton onClick={() =>{goToPage(currentPage + 1)}} text=">"/>
            
        </Flex>
    </Flex>)
}



export default Leaderboard