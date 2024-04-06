import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Search } from "../constants/icons";
import { UserList } from "../components";
import { useEffect, useState } from "react";
import { apiGetRequest, apiPostRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
import { Message } from "../components/Chats/UserList";
import io from "socket.io-client";
import { useCookies } from "react-cookie";

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
    // request bezani be server be hamrahe id
    // list e payam ha miad
    // toye state payam ha ro zakhire mikoni
    // toye Box e payam ha neshun midi
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
        <div className="absolute -top-9 md:-top-[78px] text-white px-3 py-1 rounded-lg bg-blue-400">
          چت با کاربره
        </div>

        <div className="w-[95%] mt-3 lg:mt-0 shadow-xl flex flex-row-reverse">
          <Input
            width={270}
            color="teal"
            placeholder="سرچ کنید"
            _placeholder={{ color: "inherit" }}
          />
          <Search className="text-4xl text-white bg-black cursor-pointer" />
        </div>
        {/* <CHATS CONTENT> */}
        <div className=" custom-scroll  md:h-full overflow-y-scroll  shadow-xl flex flex-col">
          {listUser.map((item) => {
            console.log(item);
            return (
              <Button key={item.id} onClick={() => selectUserChat(item.id)}>
                <UserList {...item} />
              </Button>
            );
          })}
        </div>
      </Flex>

      <Flex
        className=" left-1 top-[80px]"
        flexDirection="column"
        w={{ base: "sm", md: "xl", lg: "3xl" }}
        h="full"
        borderWidth="1px"
        mt="5px"
        roundedTop="lg"
        rounded="10px"
      >
        <Stack
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
          <Box>
            {selectedChat && (
              <>
                <Message text="Salam" actor="user" />
                <Message text="Salam" />
              </>
            )}
          </Box>
        </Stack>

        <HStack p={4} bg="gray.100">
          <Input bg="white" placeholder="Enter your text" />
          <Button onClick={sendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Chats;
