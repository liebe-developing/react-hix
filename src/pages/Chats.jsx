import {
  Box,
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
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { UserList } from "../components";
import { useEffect, useRef, useState } from "react";
import { apiGetRequest, apiPostRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
// import io from "socket.io-client";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";
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
  const [userLoading, setUserLoading] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const toast = useToast();
  const { colorMode } = useColorMode();

  const { userToken, userContent } = useOutletContext();
  useEffect(() => {
    setUserLoading(true);
    apiGetRequest(
      `api/chat_user/?upid=${userContent.user_plan_id ? userContent.user_plan_id : userContent.user.operator_user_plan_id}`,
      userToken
    ).then((res) => {
      setListUser(res.data.data);
      setUserLoading(false);
    });
  }, []);

  const [cookies, setCookie] = useCookies(["sid"]);

  const selectUserChat = (userId) => {
    if (chatLoading) return;
    setChatLoading(true);

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
          socket.on("chat:id", (data) => { });

          socket.on("widget:send", (data) => {
            const { message } = data;
            message.rid = crypto.randomUUID();
            if (!message.created_at) message.created_at = new Date();
            if (message.is_user_message === undefined)
              message.is_user_message = true;

            setSelectedChatMessages((pState) => [...pState, message]);
          });

          socket.on("operator:send", (data) => {
            const { message } = data;
            message.rid = crypto.randomUUID();
            if (!message.created_at) message.created_at = new Date();
            if (message.is_user_message === undefined)
              message.is_user_message = false;

            setSelectedChatMessages((pState) => [...pState, message]);
          });
        });

        socket.connect();
        socket.emit("operator:target", { userId });

        apiGetRequest(
          `/api/chat_messages/user/${userId}?upid=${userContent.user_plan_id ? userContent.user_plan_id : userContent.user.operator_user_plan_id}`,
          userToken
        ).then((res) => {
          setSelectedChat(userId);
          setSelectedChatMessages(res.data.data.messages);
        });
      })
      .finally(() => {
        setChatLoading(false);
      });
  };

  const sendMessage = () => {
    // socket.emit("send_message", { message: "Hello" });
    // const currentLength = selectedChatMessages.length;
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

  const handleSearchUser = (searchValue) => {
    setUserSearchTerm(searchValue);

    if (userSearchTerm !== "") {
      const filteredUsers = listUser.filter((user) =>
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers(listUser);
    }
  };

  return (
    <Flex
      h={{ base: "130vh", md: "100%" }} minH={"100%"}
      flexDirection={{ base: "column", lg: "row" }}
      // gap="6px"
      w="full"
      flexGrow={1}
    >
      <Flex flexDirection="column">
        <InputGroup>
          <Input
            w="full"
            value={userSearchTerm}
            onChange={(e) => handleSearchUser(e.target.value)}
            placeholder="جستجو..."
            _placeholder={{ color: "gray.600", fontSize: "15px" }}
            pr={8}
          />
          <InputRightElement>
            <Icon as={CiSearch} boxSize={5} cursor="pointer" />
          </InputRightElement>
        </InputGroup>
        {/* <CHATS CONTENT> */}
        <Box
          p={5}
          bg={useColorModeValue("white", "gray.900")}
          className="w-full custom-scroll md:h-full shadow-xl flex flex-col overflow-y-scroll no-scrollbar"
        >
          {userLoading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="transparent"
              color="purple.400"
              size="xl"
              mt={20}
              alignSelf="center"
            />
          )}
          {!userLoading && userSearchTerm.length > 1
            ? filteredUsers.map((item) => {
              return (
                <div key={item.id}>
                  <UserList
                    {...item}
                    loadFunc={() => selectUserChat(item.id)}
                  />
                </div>
              );
            })
            : !userLoading &&
            listUser.map((item) => {
              return (
                <div key={item.id}>
                  <UserList
                    {...item}
                    loadFunc={() => selectUserChat(item.id)}
                  />
                </div>
              );
            })}
        </Box>
      </Flex>

      <Flex className="w-full min-h-[100%]" flexDir={"column"} flexGrow={1}>
        <Flex
          flexDirection="column"
          // w={{ base: "100%", md: "99%", lg: "3xl" }}
          className="h-full flex-grow"
          // borderWidth="1px"
          flex={1}
        >
          <Flex
            bg={colorMode === "light" ? "white" : "gray.700"}
            className="w-full flex h-16 max-sm:h-22 justify-between px-4 items-center border-b-[1px] border-gray-300"
            color={colorMode === "light" ? "black" : "white"}
          >
            <Badge
              variant="outline"
              p={2}
              borderRadius="10"
              colorScheme="purple"
              fontSize={{ base: "0.9em", md: "1.1em" }}
            >
              چت با کاربر
            </Badge>
            {/* <div className="px-4 py-2 bg-blue-500 rounded-lg text-white shadow-xl">
            
          </div> */}
            {selectedChat && (
              <Text fontSize={{ base: "0.9em", md: "1.1em" }}>
                کاربر شماره {selectedChat}
              </Text>
            )}
          </Flex>

          <Stack
            bgImage={useColorModeValue("/bgchat.png", "/bgchatdark.jpg")}
            px={6}
            py={2}
            flexGrow={1}
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
            {chatLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="transparent"
                  color="purple.400"
                  size="xl"
                />
              </div>
            ) : (
              <Box className="flex flex-col flex-grow">
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
                        maxW={{ base: "90%", md: "45%" }}
                        alignSelf={is_user_message ? "flex-end" : "flex-start"}
                      >
                        {type === "text" ? (
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
                            {JSON.parse(content).items.map((item) => (
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
                          <div className="">
                            <table className="text-sm text-gray-500 dark:text-gray-400 border-2 text-center">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                  <th scope="col" className="py-3 px-6">
                                    نام
                                  </th>
                                  <th scope="col" className="py-3 px-6">
                                    لینک
                                  </th>
                                  <th scope="col" className="py-3 px-6">
                                    قیمت
                                  </th>
                                  <th scope="col" className="py-3 px-6">
                                    تصویر
                                  </th>
                                </tr>
                              </thead>
                              {
                                (() => {
                                  try {
                                    return JSON.parse(content).items.map((item, index) => (
                                      <tbody
                                        className="odd:bg-white even:bg-slate-50"
                                        key={index}
                                      >
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                          <td className="py-2 px-2">{item.title}</td>
                                          <td className="py-2 px-2">{item.url}</td>
                                          <td className="py-2 px-2">{item.price}</td>
                                          <td className="py-2">
                                            {
                                              <img
                                                src={item.image}
                                                width={50}
                                                height={50}
                                                alt="Product Image"
                                              />
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    ))
                                  }
                                  catch (error) {
                                    return content
                                  }
                                })()
                              }
                            </table>
                          </div>
                        )}
                      </Flex>
                    );
                  })}
              </Box>
            )}
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
    </Flex>
  );
}

export default Chats;
