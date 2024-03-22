import { Text } from "@chakra-ui/react";

const ErrorMessage = ({ error }) => {
  return (
    <Text color="red.500" fontSize={"11px"} mt={1}>
      {error}
    </Text>
  );
};

export default ErrorMessage;
