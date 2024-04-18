import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  useColorMode,
  Icon,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { Search } from "../constants/icons";
import { UserList } from "../components";
import { useEffect, useRef, useState } from "react";
import { apiGetRequest, apiPostRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
// import io from "socket.io-client";
import { useCookies } from "react-cookie";
import { Message } from "../components/Chats/TypeMessage";
import { Socket, io } from "socket.io-client";
import { randomInt } from "mathjs";

/**
 * @type {Socket} socket
 */
let socket;
export function Chats() {
  const [listUser, setListUser] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [messageText, setMessageText] = useState("");


  const { colorMode } = useColorMode();


  const { userToken, userContent } = useOutletContext();
  useEffect(() => {
    apiGetRequest(
      `api/chat_user/?upid=${userContent.user_plan_id}`,
      userToken
    ).then((res) => {
      setListUser(res.data.data);
    });
  }, []);

  const [cookies, setCookie] = useCookies(["sid"]);

  const selectUserChat = (userId) => {
    if (!socket) return;
    socket.emit("operator:target", { userId })
    setSelectedChat(userId);
    apiGetRequest(
      `/api/chat_messages/user/${userId}?upid=${userContent.user_plan_id}`,
      userToken
    ).then((res) => {
      setSelectedChatMessages(res.data.data);
    });
  };

  useEffect(() => {
    apiPostRequest("/chat/operator", userToken, undefined)
      .then((res) => {
        if (socket && socket.connected) {
          socket.disconnect();
          socket = undefined;
        }

        socket = io("https://portal.hixdm.com", {
          path: "/chat/socket",
          withCredentials: true,
        });

        socket.on("connect", () => {
          socket.on("chat:id", (data) => {
          });

          socket.on("widget:send", (data) => {
            const { message } = data;
            message.rid = crypto.randomUUID();
            if (!message.created_at) message.created_at = new Date();
            if (message.is_user_message === undefined) message.is_user_message = true;

            setSelectedChatMessages((pState) => [...pState, message]);
          });

          socket.on("operator:send", (data) => {
            const { message } = data;
            message.rid = crypto.randomUUID();
            if (!message.created_at) message.created_at = new Date();
            if (message.is_user_message === undefined) message.is_user_message = false;

            setSelectedChatMessages((pState) => [...pState, message]);
          });
        });

        socket.connect()
      })
  }, []);


  const sendMessage = (evnet) => {
    // socket.emit("send_message", { message: "Hello" });
    const currentLength = selectedChatMessages.length;
    setSelectedChatMessages([
      { type: "text", content: messageText, created_at: new Date() },
      ...selectedChatMessages,
    ]);

    socket
      .emit("operator:send", {
        message: {
          type: "text",
          content: messageText,
        },
        user_plan_id: userContent.user_plan_id,
      })

    setMessageText("");
  };

  const chatBoxRef = useRef();

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [selectedChatMessages])

  return (
    <Flex
      h={{ base: "130vh", md: "100vh" }}
      flexDirection={{ base: "column", lg: "row" }}
      gap="6px"
      w="full"
    >
      <Flex
        flexDirection="column"
        h={{ base: "95%" }}
        position="relative"
      // w="30%"
      >
        <InputGroup boxShadow="xl">
          <Input
            w="full"
            placeholder="سرچ کنید"
            _placeholder={{ color: "gray.600", fontSize: "15px" }}
            pr={8}
          />
          <InputRightElement>
            <Icon as={CiSearch} boxSize={5} cursor="pointer" />
          </InputRightElement>
        </InputGroup>
        {/* <CHATS CONTENT> */}
        <div className="w-full custom-scroll md:h-full shadow-xl flex flex-col overflow-y-scroll no-scrollbar ">
          {listUser.map((item) => {
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
        w={{ base: "100%", md: "99%", lg: "3xl" }}
        h={{ base: "70%", lg: "100%" }}
        borderWidth="1px"
        roundedTop="lg"
        rounded="10px"
        flexGrow="grow"
        flex={1}
      >
        <Flex
          bg={colorMode === "light" ? "gray.300" : "gray.700"}
          className="w-full flex h-16 justify-between px-4 items-center border-b-[1px] border-gray-300"
          color={colorMode === "light" ? "black" : "white"}
        >
          <div className="px-4 py-2 bg-blue-500 rounded-lg text-white shadow-xl">
            چت با کاربر
          </div>
          {selectedChat && (
            <>
              <div>کاربر شماره {selectedChat}</div>
            </>
          )}
        </Flex>

        <Stack
          bg={colorMode === "light" ? "gray.200" : "gray.800"}
          px={2}
          py={2}
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
            {selectedChat && selectedChatMessages && selectedChatMessages.map((item, index, items) => {
              const { content, is_user_message, created_at } = item;
              const type = item.type.toLocaleLowerCase();
              return (
                <Flex
                  p={2}
                  my={3}
                  ref={index === items.length - 1 ? chatBoxRef : undefined}
                  bg={is_user_message ? 'blue.500' : 'gray.100'}
                  color={is_user_message ? 'white' : 'gray.600'}
                  borderRadius="lg"
                  w="fit-content"
                  alignSelf={is_user_message ? 'flex-end' : 'flex-start'}
                >
                  {
                    type === 'text' || content.lenght > 0 ? (
                      <>
                        <Text className="relative">{content}
                          <span className="text-[9px] absolute -bottom-[27px] -left-1 text-black">{new Date(created_at).toLocaleTimeString("fa-IR", {
                            hour12: false
                          })} </span>
                        </Text>
                      </>
                    ) : type === 'form' ? (
                      <div className="flex flex-col">
                        {
                          content.map((item, index) => (
                            <div key={index} className="flex bg-blue-500 shadow-lg w-1/2 items-center gap-4 p-2 odd:bg-red-300 justify-around border-2 border-blue-700 rounded-lg">
                              <div className="text-md">{item.name}</div>
                              <div className="text-md">{item.title}</div>
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <div>
                        <table class="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 border-2">

                          {
                            content.map((item, index) => (
                              <div key={index}>
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                    <th scope="col" class="py-3 px-6">{item.title}</th>
                                  </tr>
                                </thead>
                                <tbody className="odd:bg-white even:bg-slate-50">
                                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td class="py-4 px-6">{item.title}</td>
                                  </tr>
                                </tbody>
                              </div>

                            ))
                          }
                        </table>
                      </div>
                    )
                  }
                </Flex>
              )
            })}
          </Box>
        </Stack>

        <HStack p={4} bg={colorMode === "light" ? "gray.200" : "gray.800"}>
          <Input
            color={colorMode == "light" ? "black" : "white"}
            bg="gray.500"
            placeholder="Enter your text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            _placeholder={{
              color: "gray.200",
              opacity: 1,
              fontWeight: "bold",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <Button onClick={sendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Chats;
