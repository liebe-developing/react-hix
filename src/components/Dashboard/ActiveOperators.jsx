/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { apiDeleteRequest } from "../../api/apiRequest";

const ActiveOperators = ({ loading, operators }) => {
  const { userContent, userToken } = useOutletContext();
  const navigate = useNavigate();
  const toast = useToast();

  const removeOperator = ({ email, removable }) => {
    if (removable) {
      apiDeleteRequest(
        `/api/user_plan/${userContent.user_plan_id}/operator`,
        userToken,
        {
          email,
        }
      )
        .then((res) => {
          window.location.replace(window.location.href);
        })
        .catch((err) => {
          toast({
            title: `خطایی رخ داده است.`,
            status: "error",
            position: "top-right",
          });
        });
    } else {
      toast({
        title: `نمیتوانید خودتان را حذف کنید.`,
        status: "error",
        position: "top-right",
      });
    }
  };

  return (
    <Box
      boxShadow={useColorModeValue(
        "4px 4px 0px 0px #bbb",
        "4px 4px 0px 0px #888"
      )}
      w="full"
      p={6}
      mt={12}
      bg={useColorModeValue("#fff", "#1A202C")}
      border={useColorModeValue("1px solid #000", "1px solid gray.500")}
    >
      <Flex flexDir="column" gap={4}>
        <Flex justify={"space-between"} mb={2}>
          <Heading fontSize={{ base: "15px", md: "19px" }} letterSpacing="1px">
            اپراتورهای فعال
          </Heading>
          <Link to="/settings">
            <Heading
              display="flex"
              gap={1}
              alignItems="center"
              fontSize={{ base: "11px", md: "14px" }}
              letterSpacing="1px"
            >
              <Icon
                as={FaPlusCircle}
                boxSize={{ base: 4, md: 6 }}
                color="green"
              />
              افزودن اپراتور
            </Heading>
          </Link>
        </Flex>
        {loading && (
          <Flex
            alignItems="center"
            my={4}
            mx={2}
            gap={3}
            justifyContent="space-between"
          >
            <Skeleton flex={3} height={{ base: "30", md: "4" }} />
            <Skeleton flex={3} height={{ base: "30", md: "4" }} />
            <Skeleton flex={1} height={{ base: "30", md: "4" }} />
          </Flex>
        )}
        {!loading &&
          operators &&
          operators.map((item, i) => (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              borderBottom={"2px solid rgba(255, 109, 0, 0.5)"}
              _last={{ borderBottom: "none" }}
              key={i}
              mx={0}
              py={2}
            >
              <Text
                fontSize={{ base: "14px", md: "17px" }}
              >{`اپراتور شماره :  ${i + 1}`}</Text>

              <Text fontSize={{ base: "14px", md: "17px" }}>
                {item.email.substring(0, 6) +
                  "*".repeat(item.email.length - 12) +
                  item.email.substring(item.email.length - 6)}
              </Text>
              {
                <Button
                  display="flex"
                  gap={1}
                  color={useColorModeValue("#000", "gray.300")}
                  opacity={0.6}
                  alignItems="center"
                  size={{ base: "xs", md: "md" }}
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
