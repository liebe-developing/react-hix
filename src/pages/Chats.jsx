import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  useColorMode,
  Text,
} from "@chakra-ui/react";

import { Search } from "../constants/icons";
import { UserList } from "../components";
import { useEffect, useState } from "react";
import { apiGetRequest, apiPostRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
import io from "socket.io-client";
import { useCookies } from "react-cookie";
import { Message } from "../components/Chats/TypeMessage";

// const Message = ({ text, actor }) => {
//     return (
//         <Flex
//             p={4}
//             bg={actor === 'user' ? 'blue.500' : 'gray.100'}
//             color={actor === 'user' ? 'white' : 'gray.600'}
//             borderRadius="lg"
//             w="fit-content"
//             alignSelf={actor === 'user' ? 'flex-end' : 'flex-start'}
//         >
//             <Text>{text}</Text>
//         </Flex>
//     );
// };

let socket;

export function Chats() {
  const [listUser, setListUser] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);

  const { colorMode } = useColorMode();

  const { userToken, userContent } = useOutletContext();
  useEffect(() => {
    apiGetRequest(
      `api/chat_user/?upid=${userContent.user_plan_id}`,
      userToken
    ).then((res) => {
      console.log(res.data.data);
      setListUser(res.data.data);
    });
  }, []);

  const [cookies, setCookie] = useCookies(["sid"]);

  const selectUserChat = (id) => {
    setSelectedChat(id);
    apiGetRequest(`/api/chat_messages/user/${id}?upid=${userContent.user_plan_id}`,userToken).then(res => {
      console.log(res.data.data);
      setSelectedChatMessages(res.data.data);
    })
    
  };

  useEffect(() => {
    apiPostRequest("/operator/chat", userToken, undefined)
      .then((res) => {
        console.log(res.data.sid);
        /* setCookie("sid", res.data.sid, {
          path: "https://portal.hixdm.com/",
        }); */
        socket = io("https://portal.hixdm.com", {
          withCredentials: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   console.log(cookies.name);

  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
  };

  return (
    <Flex h="100vh" flexDirection={{ base: "column", lg: "row" }} gap="6px">
      <Flex flexDirection="column" h={{ base: "95%" }} position="relative">

        <div className="w-full mt-3 lg:mt-0 shadow-xl flex flex-row-reverse">
          <Input
         height={16}
            width={290}
            color="teal"
            placeholder="سرچ کنید"
            _placeholder={{ color: "inherit" }}
          />
          <Search className="text-4xl text-white h-16  bg-black cursor-pointer" />
        </div>
        {/* <CHATS CONTENT> */}
        <div className=" custom-scroll md:h-full shadow-xl flex flex-col overflow-y-scroll no-scrollbar ">
          {listUser.map((item) => {
            console.log(item);
            return (
              <div key={item.id} onClick={() => selectUserChat(item.id)}>
                <UserList {...item} />
              </div>
            );
          })}
        </div>
      </Flex>

      <Flex
        flexDirection="column"
        w={{ base: "sm", md: "xl", lg: "3xl" }}
        h="full"
        borderWidth="1px"
        roundedTop="lg"
        rounded="10px"
      >
        {listUser && (
          <Flex
            bg={colorMode === "light" ? "gray.300" : "gray.700"}
            className="w-full flex h-16 justify-between px-4 items-center border-b-[1px] border-gray-300"
            color={colorMode === "light" ? "black" : "white"}>
            <div className="px-4 py-2 bg-blue-500 rounded-lg text-white shadow-xl">
              چت با کاربر
            </div>
            <div>کاربر شماره {listUser.id}</div>
          </Flex>
        )}
        
        <Stack
          bg={colorMode === "light" ? "gray.200" : "gray.800"}
          px={4}
          py={8}
          overflow="auto"
          flex={1}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#d5e3f7",
              borderRadius: "24px",
            },
          }}
        >
          <Box className="flex flex-col">
            {selectedChat && selectedChatMessages && selectedChatMessages.map((item,index)=>(
              <Message key={index} {...item} type={item.type}  />
            ))}
          </Box>
        </Stack>

        <HStack p={4}
          bg={colorMode === "light" ? "gray.200" : "gray.800"}
        >
          <Input color={colorMode == "light" ? "black" : "white"} bg="gray.500" placeholder="Enter your text" _placeholder={{color: "gray.200",opacity: 1, fontWeight:"bold"}} />
          <Button onClick={sendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Chats;
