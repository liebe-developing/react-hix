// Chats.jsx
import { Avatar, Box, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { CircleCheck } from "../../constants/icons";
import { Message } from "./TypeMessage";
import { boolean } from "mathjs";
import { apiPostRequest } from "../../api/apiRequest";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function UserList({ name, id, email, has_ai, loadFunc }) {
  const { userToken } = useOutletContext();
  const [ai, setAi] = useState(has_ai);

  const handleAiToggle = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    console.log(id);
    apiPostRequest(`/api/chat_user/${id}/ai/toggle`, userToken).then(() => {
      setAi(!ai);
    }).finally(() => {
      e.target.disabled = false;
    })
  }
  return (
    <Flex alignItems={"center"} justifyContent={"center"}
      px={2}
      gap={2}
      py={4}
      boxShadow="0 2px 2px -2px #bbb"
      transition="all 0.2s ease-in-out">
      <Flex
        onClick={loadFunc}
        className="flex-grow"
        cursor="pointer"
        gap={2}
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
              {/* {mes} */}
            </Text>
          </Box>
          {/* //TODO: */}
        </Flex>
      </Flex>
      <Switch colorScheme="teal" dir="rtl" isChecked={ai} onChange={handleAiToggle} />
    </Flex>
  );
}

export default UserList;
