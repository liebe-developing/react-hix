// Chats.jsx
import { Avatar, Box, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { CircleCheck } from "../../constants/icons";
import { Message } from "./TypeMessage";

function UserList({ name, id, mes }) {
  return (
    <Flex
      alignItems="center"
      px={2}
      py={4}
      gap={2}
      boxShadow="0 2px 2px -2px #bbb"
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      _hover={{ bg: "#0000000a" }}
    >
      <Avatar src="/avatar.webp" name={name} />
      <Flex alignItems="center" justifyContent="space-between" w="full">
        <Box display="flex" flexDir="column" gap={1.5}>
          <Heading fontSize="18px">
            {name + "  " + id}
            {/* <CircleCheck className="text-red-600 inline text-xl mr-10" /> */}
          </Heading>
          <Text maxW="120" className="text-xs text-gray-500" noOfLines={1}>
            {mes}
          </Text>
        </Box>
        <Switch colorScheme="teal" dir="rtl" />
        {/* //TODO: */}
      </Flex>
    </Flex>
  );
}

export default UserList;
