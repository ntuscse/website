import React from "react";

import { Button, Divider, Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, Text } from "@chakra-ui/react";

type CartRemoveModalType = {
  isOpen: boolean;
  onClose: () => void;
  removeItem: () => void;
};

export const CartRemoveModal: React.FC<CartRemoveModalType> = (props) => {
  const { isOpen, onClose, removeItem } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered trapFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody px="4" py={8} textAlign="center">
          <Text fontSize="md">Do you want to remove this product?</Text>
        </ModalBody>
        <Divider />
        <ModalFooter justifyContent="center" p={0}>
          <Button
            onClick={onClose}
            border={0}
            flexGrow={1}
            borderRadius={0}
            variant="outline"
            colorScheme="blackAlpha"
            borderRight="1px solid #E2E8F0"
          >
            No
          </Button>
          <Button border={0} borderRadius={0} flexGrow={1} variant="outline" onClick={() => removeItem()}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
