import { Faq, FaqProps } from "ui";
import { Box } from "@chakra-ui/react";

export const FaqSection = () => {
  const faqProps: FaqProps = {
    heading: "Frequently Asked Questions",
    qnaList: [
      {
        question: "Who should I contact for admission-related enquiries?",
        answer:
          "The email above is for NTU Students’ Computing and Data Science Club. " +
          "For admission-related enquiries, you can contact the NTU administrative offices using the form at https://www.ntu.edu.sg/forms/enquiry-form.",
      },
      {
        question: "Who should I contact for business opportunities?",
        answer: "You may contact scse-business@e.ntu.edu.sg.",
      },
      {
        question:
          "Who should I contact for vulnerabilities present on this website?",
        answer:
          "Please send an email to scse-it@e.ntu.edu.sg with information of the vulnerability.",
      },
      {
        question: "Who should I contact for other questions related to the SCDS Club?",
        answer:
          "Please send an email to scse-club@e.ntu.edu.sg. We will try our best to forward you to the relevant person.",
      },
    ],
  };

  return (
    <Box py={{ base: "40px", md: "80px" }} textAlign="center" px="20px">
      <Faq heading={faqProps.heading} qnaList={faqProps.qnaList} />
    </Box>
  );
};
