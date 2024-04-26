/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { apiDeleteRequest } from "../../api/apiRequest";

const ActiveOperators = ({ operators }) => {
  const {userContent, userToken} = useOutletContext();
  const navigate = useNavigate();
  const toast = useToast();

  const removeOperator = ({email, removable}) => {
    if(removable) {
      apiDeleteRequest(`/api/user_plan/${userContent.user_plan_id}/operator`, userToken, {
        email
      }).then(res => {
        window.location.replace(window.location.href);
      }).catch(err=> {
        toast({
          title: `خطایی رخ داده است.`,
          status: "error",
          position: "top-right",
        });
      })
    } else {
      
      toast({
        title: `نمیتوانید خودتان را حذف کنید.`,
        status: "error",
        position: "top-right",
      });
    }
  }

  return (
    <Box
      boxShadow={useColorModeValue("4px 4px 0px 0px #bbb", "4px 4px 0px 0px #888")}
      w="full"
      p={6}
      mt={12}
      bg={useColorModeValue("#fff", "#1A202C")}
      border={useColorModeValue("1px solid #000", "1px solid gray.500")}
    >
      <Flex flexDir="column" gap={4}>
          <Flex justify={"space-between"}>
            <Heading fontSize={{ base: "16px", md: "19px" }} letterSpacing="1px">
              اپراتورهای فعال
            </Heading>
            <Heading fontSize={{ base: "12px", md: "14px" }}  letterSpacing="1px">
              <Link to="/settings">
                افزودن اپراتور
              <Icon as={FaPlusCircle} mr={1} boxSize={6} color="green" />
              </Link>
            </Heading>
          </Flex>
        {operators && operators.map((item, i) => (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            borderBottom={"2px solid rgba(255, 109, 0, 0.5)"}
            _last={{ borderBottom: "none" }}
            key={i}
            mx={{ base: 2, md: 0 }}
            py={2}
          >
          <Box>
            <Flex gap={4} alignItems="center">
              <Text>{`اپراتور شماره : ${i + 1}`}</Text>
            </Flex>
          </Box>
          
          <Box>
              <Flex gap={4} alignItems="center">
                <Text>{item.email.substring(0, 6) + "*".repeat(item.email.length - 12) + item.email.substring(item.email.length - 6)}</Text>
              </Flex>
            </Box>
            {
            <Button
              display="flex"
              gap={1}
              color={useColorModeValue("#000", "gray.300")}
              opacity={0.6}
              alignItems="center"
              onClick={() => removeOperator(item)}
            >
              <Icon as={FaTrashCan} boxSize={4} color="red" />
              <Text>حذف</Text>
            </Button>
            }
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default ActiveOperators;
