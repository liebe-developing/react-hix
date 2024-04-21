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
  Badge,
  IconButton,
  useColorModeValue,
  useToast,
  Spinner,
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
import { IoSend } from "react-icons/io5";

/**
 * @type {Socket} socket
 */
let socket;
export function Chats() {
  const [listUser, setListUser] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const toast = useToast();
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
    if (!socket || chatLoading) return;

    setChatLoading(true);
    socket.emit("operator:target", { userId });
    setSelectedChat(userId);
    apiGetRequest(
      `/api/chat_messages/user/${userId}?upid=${userContent.user_plan_id}`,
      userToken
    ).then((res) => {
      setSelectedChatMessages(res.data.data);
    }).finally(() => {
      setChatLoading(false);
    });
  };
  function checkForSpace(ch) {
    return /^[A-Z]$/i.test(ch);
  }
  useEffect(() => {
    apiPostRequest("/chat/operator", userToken, undefined).then((res) => {
      if (socket && socket.connected) {
        socket.disconnect();
        socket = undefined;
      }

      socket = io("https://portal.hixdm.com", {
        path: "/chat/socket",
        withCredentials: true,
      });

      socket.on("connect", () => {
        socket.on("chat:id", (data) => { });

        socket.on("widget:send", (data) => {
          console.log(1);
          const { message } = data;
          message.rid = crypto.randomUUID();
          if (!message.created_at) message.created_at = new Date();
          if (message.is_user_message === undefined)
            message.is_user_message = true;

          setSelectedChatMessages((pState) => [...pState, message]);
        });

        socket.on("operator:send", (data) => {
          console.log(2);
          const { message } = data;
          message.rid = crypto.randomUUID();
          if (!message.created_at) message.created_at = new Date();
          if (message.is_user_message === undefined)
            message.is_user_message = false;

          setSelectedChatMessages((pState) => [...pState, message]);
        });
      });

      socket.connect();
    });
  }, []);

  console.log(selectedChatMessages);

  const sendMessage = (evnet) => {
    // socket.emit("send_message", { message: "Hello" });
    const currentLength = selectedChatMessages.length;
    // setSelectedChatMessages([
    //   { type: "text", content: messageText, created_at: new Date() },
    //   ...selectedChatMessages,
    // ]);

    socket.emit("operator:send", {
      message: {
        type: "text",
        content: messageText,
      },
      user_plan_id: userContent.user_plan_id,
    });

    setMessageText("");
  };

  const chatBoxRef = useRef();

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [selectedChatMessages]);

  console.log(selectedChatMessages);

  return (
    <Flex
      h={{ base: "130vh", md: "100vh" }}
      flexDirection={{ base: "column", lg: "row" }}
      // gap="6px"
      w="full"
    >
      <Flex flexDirection="column" position="relative">
        <InputGroup>
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
        <Box
          bg={useColorModeValue("white", "gray.900")}
          className="w-full custom-scroll md:h-full shadow-xl flex flex-col overflow-y-scroll no-scrollbar"
        >
          {listUser.map((item) => {
            return (
              <div key={item.id}>
                <UserList {...item} loadFunc={() => selectUserChat(item.id)} />
              </div>
            );
          })}
        </Box>
      </Flex>

      <Flex
        flexDirection="column"
        // w={{ base: "100%", md: "99%", lg: "3xl" }}
        // h={{ base: "70%", lg: "100%" }}
        // borderWidth="1px"
        flex={1}
      >
        <Flex
          bg={colorMode === "light" ? "white" : "gray.700"}
          className="w-full flex h-16 justify-between px-4 items-center border-b-[1px] border-gray-300"
          color={colorMode === "light" ? "black" : "white"}
        >
          <Badge
            variant="outline"
            p={2}
            borderRadius="10"
            colorScheme="purple"
            fontSize="1.1em"
          >
            چت با کاربر
          </Badge>
          {/* <div className="px-4 py-2 bg-blue-500 rounded-lg text-white shadow-xl">
            
          </div> */}
          {selectedChat && (
            <>
              <div>کاربر شماره {selectedChat}</div>
            </>
          )}
        </Flex>

        <Stack
          bgImage={useColorModeValue("/bgchat.png", "/bgchatdark.jpg")}
          px={6}
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
          {chatLoading ? <div className="w-full h-full flex items-center justify-center"><Spinner size='xl'  /></div> :
            <Box className="flex flex-col">
              {selectedChat &&
                selectedChatMessages &&
                selectedChatMessages.map((item, index, items) => {
                  const { content, is_user_message, created_at } = item;
                  const type = item.type.toLocaleLowerCase();
                  return (
                    <Flex
                      key={item.id}
                      p={1}
                      my={0}
                      ref={index === items.length - 1 ? chatBoxRef : undefined}
                      // bg={is_user_message ? "blue.500" : "gray.100"}
                      // color={is_user_message ? "white" : "gray.600"}
                      // borderRadius="lg"
                      w="fit-content"
                      maxW={"45%"}
                      alignSelf={is_user_message ? "flex-end" : "flex-start"}
                    >
                      {type === "text" || content.length > 0 ? (
                        <Flex
                          flexDir="column"
                          gap={2}
                          alignItems={is_user_message ? "end" : "start"}
                        >
                          <Text
                            minW={{ base: "", md: "70" }}
                            textAlign={is_user_message ? "left" : "right"}
                            bg={is_user_message ? "gray.200" : "purple"}
                            color={is_user_message ? "black" : "white"}
                            fontSize="16px"
                            padding={"15px"}
                            borderRadius={
                              is_user_message
                                ? "50px 50px 50px 0"
                                : "20px 20px 0 20px"
                            }
                          >
                            {content}
                          </Text>
                          <Text fontSize="11px" color="gray-500">
                            {new Date(created_at).toLocaleTimeString("fa-IR", {
                              hour12: false,
                            })}{" "}
                          </Text>
                        </Flex>
                      ) : type === "form" ? (
                        <div className="flex flex-col">
                          {content.map((item) => (
                            <div
                              key={item.id}
                              className="flex bg-blue-500 shadow-lg w-1/2 items-center gap-4 p-2 odd:bg-red-300 justify-around border-2 border-blue-700 rounded-lg"
                            >
                              <div className="text-md">{item.name}</div>
                              <div className="text-md">{item.title}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 border-2">
                            {content.map((item, index) => (
                              <div key={index}>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                    <th scope="col" className="py-3 px-6">
                                      {item.title}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="odd:bg-white even:bg-slate-50">
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-4 px-6">{item.title}</td>
                                  </tr>
                                </tbody>
                              </div>
                            ))}
                          </table>
                        </div>
                      )}
                    </Flex>
                  );
                })}
            </Box>
          }
        </Stack>

        <HStack
          h="75px"
          px={8}
          bg={colorMode === "light" ? "white" : "gray.700"}
          _focusWithin={{ boxShadow: "-1px 0 100px rgba(0,0,0,0.05)" }}
        >
          <Input
            color={colorMode == "light" ? "black" : "white"}
            variant="unstyled"
            placeholder="پیامی بنویسید..."
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
            _placeholder={{
              color: "gray.400",
            }}
            pattern="\s*\S+.*"
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                messageText !== "" &&
                messageText.trim()
              ) {
                sendMessage();
              }
            }}
          />
          {messageText !== "" && messageText.trim() && (
            <Icon
              boxSize={6}
              color={useColorModeValue("purple", "gray.200")}
              transform="rotate(180deg)"
              as={IoSend}
              onClick={() => {
                sendMessage();
              }}
              cursor="pointer"
            />
          )}
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Chats;
