import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

const NavlinkBox = ({ icon, title, desc }) => {
  return (
    <Box
      w={{ base: "full", md: "300px" }}
      h="80px"
      borderRadius="16px"
      border="1px solid #000"
      bgColor="#FF6D004D"
      p={3}
      cursor="pointer"
      role="group"
    >
      <Flex alignItems="center" w="full" justifyContent="space-between">
        <HStack spacing={2}>
          <Image
            src={icon}
            transition="all 0.3s ease-in-out"
            _groupHover={{ transform: "scale(1.1)" }}
          />
          <VStack spacing={1} align="start">
            <Text
              color="#303030"
              lineHeight="20px"
              fontSize={"12px"}
              fontWeight="600"
            >
              {title}
            </Text>
            <Text
              color="rgba(60, 9, 108, 0.5)"
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
          _hover={{ bg: "#f4bb8f96" }}
        />
      </Flex>
    </Box>
  );
};

export default NavlinkBox;
