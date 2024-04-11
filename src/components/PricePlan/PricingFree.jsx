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

export default function Pricing({ userToken, monthPlan, userContent }) {
    const toast = useToast();
    const navigate = useNavigate();

    const sendRouteOrderHandler = (planId) => {
        apiPostRequest(`api/payment/free?orderId=${userContent.userId}.${planId}`, userToken, {
            planId,
        })
            .then((res) => {
                console.log(res.data.data.id);
                toast({
                    title: `پلن رایگان ساخته شد!`,
                    status: "success",
                    position: "bottom-left",
                    isClosable: false,
                });
                setTimeout(() => {
                    navigate("/", {
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
                                <Box py={4} px={12} borderBottom="1px solid #eee">
                                    <Text fontWeight="500" fontSize="2xl"></Text>
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

