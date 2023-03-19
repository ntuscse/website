import { Hero } from "ui";
import { AcademicsFooterContentText, PYPSection } from "@/features/academics";

const Academics = () => {
  return (
    <>
      <Hero
        backgroundImage="/heroes/academics-banner.png"
        backgroundGradient="linear(to-r, whiteAlpha.500, whiteAlpha.500)"
      />
      <PYPSection />
      <AcademicsFooterContentText />
    </>
  );
};

export default Academics;
