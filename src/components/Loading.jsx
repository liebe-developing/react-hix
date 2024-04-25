import { Flex, Spinner } from "@chakra-ui/react";

const Loading = ({ color, emColor, ...res }) => {
  return (
    <Flex justifyContent="center" alignItems="center" w="full" h="full">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor={emColor}
        color={color}
        size="xl"
        {...res}
      />
    </Flex>
  );
};

export default Loading;
