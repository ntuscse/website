import React from "react";
import { Link } from "@chakra-ui/react";
import { Image } from "../image";

export interface VercelPoweredProps {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const VercelPowered = ({
  href,
  src,
  alt,
  width,
  height,
}: VercelPoweredProps) => {
  return (
    <Link
      href={href}
      bgColor="white"
      borderRadius="7px"
      p="1px"
      data-testid="vercel-powered-icon"
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </Link>
  );
};
