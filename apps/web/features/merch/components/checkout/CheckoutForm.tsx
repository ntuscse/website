import React, { useState } from "react";
import Joi from "joi";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import StripeForm from "./StripeForm";

type CheckoutFormProps = {
  email: string;
};

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
  const { email = "" } = props;
  const [emailInput, setEmailInput] = useState<string>(email);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [showPaymentElement, setShowPaymentElement] = useState<boolean>(false);

  const emailValidator = Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email");

  const handleNext = async () => {
    try {
      await emailValidator.validateAsync(emailInput);
      setEmailError(false);
      setShowPaymentElement(true);
    } catch (err: any) {
      setEmailError(true);
    }
  };

  return (
    <Flex flexDirection="column">
      <Text fontWeight={500} fontSize={["md", "l"]}>
        Contact information
      </Text>
      <Input
        mt={2}
        size="md"
        type="text"
        placeholder="Email"
        value={emailInput}
        onChange={(event) => setEmailInput(event.target.value)}
      />
      {emailError && (
        <Text fontSize="sm" color="red">
          Please enter a valid email format
        </Text>
      )}

      {!showPaymentElement ? (
        <Button mt={2} onClick={handleNext}>
          Next
        </Button>
      ) : (
        <StripeForm />
      )}
    </Flex>
  );
};

export default CheckoutForm;
