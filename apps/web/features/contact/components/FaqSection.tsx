import { Faq, FaqProps } from "ui";
import { Box } from "@chakra-ui/react";

export const FaqSection = () => {
  const faqProps: FaqProps = {
    heading: "Frequently Asked Questions",
    qnaList: [
      {
        question: "What is the level required?",
        answer:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. " +
          "The passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
      },
      {
        question: "Level required?",
        answer: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. " +
          "The passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
      },
      {
        question: "What is the level required?",
        answer:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. " +
          "The passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
      },
      {
        question: "What is the level required?",
        answer:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. " +
          "The passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
      },
    ],
  };

  return (
    <Box py={{ base: "40px", md: "80px" }} textAlign="center" px="20px">
      <Faq heading={faqProps.heading} qnaList={faqProps.qnaList} />
    </Box>
  );
};
