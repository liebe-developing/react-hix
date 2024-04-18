/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavlinkBox = ({ icon, title, desc,link }) => {
  return (
    <Box
      w={{ base: "full", md: "300px" }}
      h="80px"
      borderRadius="16px"
      border={useColorModeValue("1px solid #000", "1px solid gray.500")}
      bgColor={useColorModeValue("#FF6D004D", "gray.800")}
      p={3}
      cursor="pointer"
      role="group"
    >
      <Flex alignItems="center" w="full" justifyContent="space-between">
        <HStack spacing={2}>
          <Link to={link}>
            <Image
              src={icon}
              transition="all 0.3s ease-in-out"
              _groupHover={{ transform: "scale(1.1)" }}
            />
          </Link>
          <VStack spacing={1} align="start">
            <Text
              color={useColorModeValue("#303030", "white")}
              lineHeight="20px"
              fontSize={"12px"}
              fontWeight="600"
            >
              {title}
            </Text>
            <Text
              color={useColorModeValue("rgba(60, 9, 108, 0.5)", "gray.300")}
              lineHeight="20px"
              fontSize={"12px"}
            >
              {desc}
            </Text>
          </VStack>
        </HStack>
        <IconButton
          variant="unstyled"
          as={FaEllipsisVertical}
          padding={2.5}
          cursor="pointer"
          borderRadius="50%"
          _hover={{ bg: useColorModeValue("#f4bb8f96", "gray.700") }}
        />
      </Flex>
    </Box>
  );
};

export default NavlinkBox;
