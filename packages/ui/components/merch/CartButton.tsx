import Link from "next/link"
import { Icon } from "@chakra-ui/react";
import routes from "../../../../apps/web/features/merch/constants/routes";

const CartButton = () => {
  return(
      <Icon viewBox="0 0 24 24" boxSize={7}>
          <path fill="none" stroke-width="1.5" stroke="white"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </Icon>
  )
}

/*
const CartButton = () => {
    return(
    <Link href={routes.CART}
      style={{
        textDecoration: "none",
        background: "black",
        width: "2.8em",
        height: "2.8em",
        padding: 0,
        borderRadius: "50%",
        display: "flex", 
        justifyContent: "center",
        alignItems: "center"
      }}>
          <Icon p="0.3em"
          bg="brand.red.medium" 
          borderRadius="50%"  _hover={{
            background: "brand.red.dark"
          }}
          viewBox="0 0 24 24" boxSize={10}>
            <path fill="none" stroke-width="1.5" stroke="white"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </Icon>
      </Link>
    )
}
*/

export default CartButton;