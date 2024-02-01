import { Button } from "@chakra-ui/react"

interface PaginationButtonProps {
    onClick: () => void
    variant?: string
    text: string
}

export const PaginationButton = ({ onClick, variant = 'primary-blue', text }: PaginationButtonProps) => {
    return <Button onClick={onClick} variant={variant} size={['sm', 'md']} _hover={{ bg: variant }} mx={4}>{text}</Button>
}

export default PaginationButton