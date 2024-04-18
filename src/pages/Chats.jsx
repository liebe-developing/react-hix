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
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { Search } from "../constants/icons";
import { UserList } from "../components";
import { useEffect, useState } from "react";
import { apiGetRequest, apiPostRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
// import io from "socket.io-client";
import { useCookies } from "react-cookie";
import { Message } from "../components/Chats/TypeMessage";
import { Socket, io } from "socket.io-client";

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
      console.log(res.data.data);
      setListUser(res.data.data);
    });
  }, []);

  const [cookies, setCookie] = useCookies(["sid"]);

  const selectUserChat = async (userId) => {
    socket.emitWithAck("operator:target", { userId }).then((ack) => {
      setSelectedChat(userId);
      apiGetRequest(
        `/api/chat_messages/user/${userId}?upid=${userContent.user_plan_id}`,
        userToken
      ).then((res) => {
        setSelectedChatMessages(res.data.data);
      });
    });
  };

  useEffect(() => {
    apiPostRequest("/chat/operator", userToken, undefined)
      .then((res) => {
        console.log(res.data.sid);
        socket = io("https://portal.hixdm.com", {
          path: "/chat/socket",
          withCredentials: true,
        });

        socket.on("connect", () => {
          console.log("Connected to chat server");

          socket.on("chat:id", (data) => {
            console.log(data.userId);
          });

          socket.on("widget:send", (data) => {
            const { message } = data;
            setSelectedChatMessages([...selectedChatMessages, message]);
          });

          socket.on("operator:send", (data) => {
            setSelectedChatMessages([...selectedChatMessages, data.message]);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   console.log(cookies.name);

  const sendMessage = (evnet) => {
    // socket.emit("send_message", { message: "Hello" });
    const currentLength = selectedChatMessages.length;
    setSelectedChatMessages([
      ...selectedChatMessages,
      { type: "text", content: messageText, created_at: new Date() },
    ]);

    socket
      .emitWithAck("operator:send", {
        message: {
          type: "text",
          content: messageText,
        },
        user_plan_id: userContent.user_plan_id,
      })
      .catch((err) => {
        setSelectedChatMessages(
          selectedChatMessages.filter((v, i) => i != currentLength)
        );
      });

    setMessageText("");
    console.log(selectedChatMessages);
  };

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
            {selectedChat &&
              selectedChatMessages &&
              selectedChatMessages.map((item, index) => (
                <Message
                  key={index}
                  {...item}
                  type={item.type.toLocaleLowerCase()}
                />
              ))}
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
