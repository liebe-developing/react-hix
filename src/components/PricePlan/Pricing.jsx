/* eslint-disable react/prop-types */
import {
  Box,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Heading,
  useToast,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { apiPostRequest } from "../../api/apiRequest";
import { useNavigate } from "react-router-dom";
import * as persianTools from "@persian-tools/persian-tools";

function PriceWrapper(props) {
  const { children } = props;

  return (
    <Box
      
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
      w="50%"
      mx="auto"
    >
      {children}
    </Box>
  );
}

export default function Pricing({ userToken, monthPlan }) {
  const toast = useToast();

  const navigate = useNavigate();

  const sendRouteOrderHandler = (planId) => {
    apiPostRequest("api/invoice", userToken, {
      planId,
    })
      .then((res) => {
        console.log(res.data.data.id);
        toast({
          title: `در حال انتقال به صفحه سفارش`,
          status: "success",
          position: "bottom-left",
          isClosable: false,
        });
        setTimeout(() => {
          navigate("/dashboard/order", {
            state: {
              invoiceId: res.data.data.id,
            },
          });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: `مشکلی به وجود آمده است`,
          status: "error",
          position: "bottom-left",
          isClosable: false,
        });
      });
  };

  return (
    <Box py={0} m="0 auto" mx={10}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        textAlign="center"
        gap={10}
        spacing={{ base: 4, lg: 5 }}
        py={0}
        mx={{ base: 0, md: 10 }}
        columns={[1, 1, 1,2]}
      >
        {monthPlan &&
          monthPlan.map((item) => {
            const {
              chat_count,
              gift_chat_count,
              days,
              file_size_limit,
              gift_file_size_limit,
              id,
              operator_count,
              oldPrice,
              price,
              title,
            } = item;
            const persianPrice = price / 10;
            const persianOldPrice = oldPrice / 10;
            return (
              <PriceWrapper key={id} boxShadow="xl" >
                <Box py={4} px={12} borderBottom="1px solid #eee" >
                  {/* Discount UI START */}
                  {price ? (
                    <Box
                      position="relative"
                      h={12}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        opacity="1"
                        fontSize="2xl"
                        className="line-through mx-2 decoration-2 decoration-red-500"
                        fontWeight="900"
                      >
                        {persianTools.digitsEnToFa(
                          persianTools.addCommas(persianOldPrice)
                        )}{" "}
                      </Text>
                      <Text opacity="1" fontSize="2xl" fontWeight="900">
                        تومان
                      </Text>
                    </Box>
                  ) : null}
                  {/* Discount UI END */}
                  <HStack justifyContent="center" >
                    {price > 0 ? (
                      <>
                        <Text fontSize="20px" opacity="0.8">
                          {persianTools.digitsEnToFa(
                            persianTools.addCommas(persianPrice)
                          )}{" "}
                        </Text>
                        <Text fontSize={18}>تومان</Text>
                      </>
                    ) : (
                      <Text
                        fontSize={"3xl"}
                        fontWeight="600"
                        fontFamily="Casablanca"
                      >
                        رایگان
                      </Text>
                    )}
                    <Text fontSize="xl" color="gray.800">
                      {days > 30
                        ? (days !== 365 ? days / 30 : 12) + "ماهه"
                        : days + "روزه"}
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  bg={useColorModeValue("gray.50", "gray.800")}
                  py={2}
                  borderBottomRadius={"xl"}
                >
                  <Heading fontSize={"22px"} mb={3}>
                    {title}
                  </Heading>
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem
                      display="flex"
                      alignItems="center"
                      gap={1}
                      fontSize={{ base: "13px", md: "16px" }}
                    >
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      تعداد مکالمه:{" "}
                      {gift_chat_count !== 0 ? (
                        <>
                          <Text>{chat_count} +</Text>
                          <Text color="#6b38e2" fontWeight={"900"}>
                            {gift_chat_count} هدیه
                          </Text>
                        </>
                      ) : (
                        chat_count
                      )}
                    </ListItem>
                    <ListItem
                      display="flex"
                      alignItems="center"
                      gap={1}
                      fontSize={{ base: "13px", md: "16px" }}
                    >
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      آپلود فایل تا:{" "}
                      {gift_file_size_limit !== 0 ? (
                        <>
                          <Text>{file_size_limit} مگابایت +</Text>
                          <Text color="#6b38e2" fontWeight={"900"}>
                            {gift_file_size_limit} هدیه
                          </Text>
                        </>
                      ) : (
                        <Text>{file_size_limit} مگابایت</Text>
                      )}
                    </ListItem>
                    <ListItem
                      display="flex"
                      gap={1}
                      alignItems="center"
                      fontSize={{ base: "13px", md: "16px" }}
                    >
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      <Flex gap={2}>
                        <Text>تعداد اپراتور:</Text>
                        {operator_count === 999999999
                          ? "نامحدود"
                          : operator_count}
                      </Flex>
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    <Button
                      onClick={() => sendRouteOrderHandler(id)}
                      w={price > 0 ? "90%" : "260px"}
                      colorScheme="#000"
                      color="#ffff"
                      bg="#48BA06"
                     
                      variant="outline"
                      fontSize={{base: "sm",md:"x-large"}}
                      _hover={{ bg: "orange.200", color: "#697A6F", shadow:"xl" }}
                    >
                      خرید
                    </Button>
                  </Box>
                </VStack>
              </PriceWrapper>
            );
          })}
      </Flex>
    </Box>
  );
}
