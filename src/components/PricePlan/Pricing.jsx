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
  return (
    <Box py={0}>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={0}
      >
        {monthPlan &&
          monthPlan.map((item) => {
            const {
              chat_count,
              days,
              file_size_limit,
              id,
              operator_count,
              price,
              title,
            } = item;
            const persianPrice = price / 10;
            return (
              <PriceWrapper key={id}>
                <Box py={4} px={12}  borderBottom="1px solid #eee">
                  {/* Discount UI START */}
                  {price ? (
                    <Box position="relative" h={9} display="flex" >
                      <span className="absolute w-[2px] h-9 bg-red-300 -top-1 right-10 rotate-12 "></span>
                      <Text opacity=".5">
                        {persianTools.digitsEnToFa(
                          persianTools.addCommas(300000000)
                        )}
                      </Text>
                      <Text opacity=".5" mr="10px" w={14} h={7} p="1" rounded={10} bg="#f34f">
                        %30 <span></span>
                      </Text>
                      <Text opacity=".5" mr={2}>
                        تخفیف
                      </Text>
                    </Box>
                  ) : null }
                  {/* Discount UI END */}
                  <HStack justifyContent="center">
                    {price > 0 ? (
                      <>
                        <Text fontSize="4xl" fontWeight="900">
                          {persianTools.digitsEnToFa(
                            persianTools.addCommas(persianPrice)
                          )}
                        </Text>
                        <Text
                          fontSize="3xl"
                          fontWeight="600"
                          fontFamily="Casablanca"
                        >
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
                    <Text fontSize="xl" color="gray.500">
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
                      تعداد چت: {chat_count}
                    </ListItem>
                    <ListItem display="flex" alignItems="center" gap={1}>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      محدودیت اندازه فایل: {file_size_limit}
                    </ListItem>
                    <ListItem display="flex" alignItems="center" gap={1}>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      تعداد اپراتور:{" "}
                      {operator_count === 999999999
                        ? "نامحدود"
                        : operator_count}
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
      </Stack>
    </Box>
  );
}