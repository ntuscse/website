import React from 'react';
import { Image, Flex, Text } from "@chakra-ui/react";

interface QRCodeProps {
  order: string | undefined;
}

const QRCode: React.FC<QRCodeProps> = ({ order }) => (
  <Flex
    mt={6}
    alignItems="center"
    py={3}
    borderRadius="lg"
    borderWidth="1px"
    flexDirection="column"
    rowGap={4}
  >
    <Image
      src={
        order
          ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3001"}/merch/orders/${order}`
          : ""
      }
      alt="QRCode"
      width={150}
      height={150}
      sizes="(max-width: 768px)"
    />
    <Text fontWeight="bold">
      Please screenshot this QR code and show it at SCSE Lounge to collect your order.
      Alternatively, show the email receipt you have received.
    </Text>
    <Text>
      For any assistance, please contact our email address:
      merch@ntuscse.com
    </Text>
  </Flex>
);

export default QRCode;
