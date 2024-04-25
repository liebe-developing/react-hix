/* eslint-disable react/prop-types */
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Text,
    VStack,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavlinkBox = ({ icon, title, desc, link }) => {
    const { colorMode } = useColorMode();
    return (
        <Box
            w={{ base: "full", md: "250px" }}
            h="80px"
            borderRadius="16px"
            boxShadow={useColorModeValue("4px 4px 0px 0px #bbb", "4px 4px 0px 0px #888")}
            border={useColorModeValue("1px solid #000", "1px solid gray.500")}
            bgColor={useColorModeValue("#FF6D004D", "gray.800")}
            p={3}
            cursor="pointer"
            role="group"
            className="flex-grow"
        >
            <Link to={link}>
                <Flex
                    alignItems="center"
                    w="full"
                    justifyContent="space-between"
                >
                    <HStack spacing={2}>
                        <Image
                            src={icon}
                            transition="all 0.3s ease-in-out"
                            _groupHover={{ transform: "scale(1.1)" }}
                            style={
                                colorMode !== "light"
                                    ? {
                                          backgroundBlendMode: "luminosity",
                                          background: "#7f56af",
                                          borderRadius: "15px",
                                      }
                                    : {
                                          borderRadius: "15px",
                                      }
                            }
                        />
                        <VStack spacing={1} align="start">
                            <Text
                                color={useColorModeValue("#303030", "white")}
                                lineHeight="20px"
                                fontSize={"12px"}
                                fontWeight="600"
                            >
                                {title}
                            </Text>
                            <Text
                                color={useColorModeValue(
                                    "rgba(60, 9, 108, 0.5)",
                                    "gray.300"
                                )}
                                lineHeight="20px"
                                fontSize={"12px"}
                            >
                                {desc}
                            </Text>
                        </VStack>
                    </HStack>
                    <IconButton
                        variant="unstyled"
                        as={FaEllipsisVertical}
                        padding={2.5}
                        cursor="pointer"
                        borderRadius="50%"
                        _hover={{
                            bg: useColorModeValue("#f4bb8f96", "gray.700"),
                        }}
                    />
                </Flex>
            </Link>
        </Box>
    );
};

export default NavlinkBox;
