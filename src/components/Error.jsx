import { Flex, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const Error = ({ title }) => {
  return (
    <Flex justifyContent="center" alignItems="center" w="full" h="full">
      <Alert status="error" dir="rtl" mt={4} fontSize="13px">
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
      </Alert>
    </Flex>
  );
};

export default Error;
