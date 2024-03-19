/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

const DarkModeButton = ({ colorMode, toggleColorMode, scrolled }) => {
  return (
    <Button
      aria-label="Toggle Color Mode"
      onClick={toggleColorMode}
      variant="ghost"
      display="flex"
      size={{ base: "sm", md: "md" }}
    >
      {colorMode === "light" ? (
        <BsMoonStarsFill
          className={scrolled ? "text-green-400" : "text-[#054949]"}
          w={{ base: "18px", md: "22px" }}
          h={{ base: "18px", md: "22px" }}
        />
      ) : (
        <BsSun
          w={{ base: "18px", md: "22px" }}
          h={{ base: "18px", md: "22px" }}
          className={"text-[#fbd38d]"}
        />
      )}
    </Button>
  );
};

export default DarkModeButton;
