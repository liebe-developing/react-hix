/* eslint-disable react/prop-types */
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

const Stats = ({ title, number }) => {
  return (
    <Box
      border="1px solid #000"
      borderRadius="20px"
      h="180px"
      w={{ base: "45%", md: "46%" }}
      p={6}
      boxShadow="4px 4px 0px 0px #000000"
    >
      <Flex
        flexDir="column"
        justifyContent="space-between"
        alignItems="start"
        h="full"
      >
        <Text
          color="#FF6D00"
          fontWeight="600"
          fontSize="16px"
          lineHeight="27px"
        >
          {title}
        </Text>
        <Box w="full">
          <Flex alignItems="center" justifyContent="space-between" w="full">
            <Box>
              <Text color="#FF6D00" fontWeight="700" fontSize="40px">
                {number}
              </Text>
            </Box>
            <Spacer />
            <Box w="4px" h="30px" bgColor={"#FF6D00"}></Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Stats;
