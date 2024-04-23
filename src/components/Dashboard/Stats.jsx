/* eslint-disable react/prop-types */
import { Box, Flex, Spacer, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";

const Stats = ({ title, value }) => {

  const { colorMode } = useColorMode();

  return (
    <Box
      border={useColorModeValue("1px solid #000", "1px solid gray.500")}
      borderRadius="20px"
      h="180px"
      w={{ base: "45%", md: "46%" }}
      p={6}
      boxShadow={colorMode === 'light' ? '4px 4px 0px 0px #000000' : "4px 4px 0px 0px #fff"}
    >
      <Flex
        flexDir="column"
        justifyContent="space-between"
        alignItems="start"
        h="full"
      >
        <Text
          color={useColorModeValue("#0C2B6D", "4px 4px 0px 0px #00000036")}
          fontWeight="600"
          fontSize="16px"
          lineHeight="27px"
        >
          {title}
        </Text>
        <Box w="full">
          <Flex alignItems="center" justifyContent="space-between" w="full">
            <Box>
              <Text
                color="#FF6D00"
                fontWeight="700"
                fontSize={{ base: "20px", md: "30px" }}
              >
                {value}
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
