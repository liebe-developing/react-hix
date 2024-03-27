import { Button } from "@chakra-ui/react";

/* eslint-disable react/prop-types */
const PrimaryButton = ({ title, type, btnFn, ...rest }) => {
  return (
    <Button
      display="flex"
      alignItems="center"
      gap={2}
      _hover={{ opacity: "95%" }}
      variant="unstyled"
      boxShadow="#FF6D00 0 0 16px -7px !important"
      color="#fff"
      bgColor="#FF6D00"
      p={{ base: "22px", md: "24px" }}
      fontFamily="Casablanca"
      rounded="xl"
      fontSize={{ base: "18px", md: "20px" }}
      type={type}
      onClick={btnFn}
      {...rest}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
