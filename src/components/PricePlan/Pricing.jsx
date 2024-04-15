/* eslint-disable react/prop-types */
import {
  Box,
  Stack,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Spinner,
  Heading,
  useToast,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { apiPostRequest } from "../../api/apiRequest";
import { useNavigate } from "react-router-dom";
import * as persianTools from "@persian-tools/persian-tools";
import { useState } from "react";

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
          navigate("/order", {
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
  console.log(monthPlan);
  return (
    <Box py={0} m="0 auto" mx={10}>
      <SimpleGrid
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 5 }}
        py={0}
        mx={20}
        columns={[1, null, 2]}
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
              <PriceWrapper key={id} boxShadow="xl">
                <Box py={4} px={12} borderBottom="1px solid #eee">
                  {/* Discount UI START */}
                  {price ? (
                    <Box
                      position="relative"
                      h={12}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <span className="absolute w-[2px] h-[90px] bg-red-500 right-40 rotate-[80deg]"></span>
                      <Text opacity="1" fontSize="2xl" fontWeight="900">
                        {persianTools.digitsEnToFa(
                          persianTools.addCommas(persianOldPrice)
                        )}{" "}
                        تومان
                      </Text>
                    </Box>
                  ) : null}
                  {/* Discount UI END */}
                  <HStack justifyContent="center">
                    {price > 0 ? (
                      <>
                        <Text fontSize="xl" opacity="0.8">
                          {persianTools.digitsEnToFa(
                            persianTools.addCommas(persianPrice)
                          )}{" "}
                          تومان
                        </Text>
                      </>
                    ) : (
                      <Text
                        fontSize="3xl"
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
                  bg={useColorModeValue("gray.50", "gray.800")}
                  py={2}
                  borderBottomRadius={"xl"}
                >
                  <Heading fontSize={"22px"} mb={3}>
                    {title}
                  </Heading>
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem display="flex" alignItems="center" gap={1}>
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
                    <ListItem display="flex" alignItems="center" gap={1}>
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
                    <ListItem display="flex" gap={1} alignItems="center">
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
                      w="full"
                      colorScheme="red"
                      variant="outline"
                    >
                      خرید
                    </Button>
                  </Box>
                </VStack>
              </PriceWrapper>
            );
          })}
      </SimpleGrid>
    </Box>
  );
}
