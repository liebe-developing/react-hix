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
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const option1 = ["آپشن شماره 1", "آپشن شماره 2", "آپشن شماره 3"];
const option2 = [
  "آپشن شماره 1",
  "آپشن شماره 2",
  "آپشن شماره 3",
  "آپشن شماره 4",
  "آپشن شماره 5",
  "آپشن شماره 6",
];
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

export default function ThreeTierPricing() {
  return (
    <Box py={0}>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={0}
      >
        <PriceWrapper>
          <Box py={4} px={12} borderBottom='1px solid #eee'>
            <Text fontWeight="500" fontSize="2xl">
              عادی
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="4xl" fontWeight="900">
                ۷۹۰۰۰
              </Text>
              <Text fontSize="3xl" fontWeight="600" fontFamily="Casablanca">
                تومان
              </Text>
              <Text fontSize="xl" color="gray.500">
                /ماهانه
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.800")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              {option1.map((option, idx) => (
                <ListItem key={idx} display="flex" alignItems="center" gap={1}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {option}
                </ListItem>
              ))}
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline">
                خرید
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: "translate(-50%)" }}
            >
              <Text
                textTransform="uppercase"
                bg={useColorModeValue("red.300", "red.700")}
                px={3}
                py={1}
                color={useColorModeValue("gray.900", "gray.300")}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                محبوب ترین
              </Text>
            </Box>
            <Box py={4} px={12} borderBottom='1px solid #eee'>
              <Text fontWeight="500" fontSize="2xl">
                اقتصادی
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="4xl" fontWeight="900">
                  ۱۴۰۰۰۰
                </Text>
                <Text fontSize="3xl" fontWeight="600" fontFamily="Casablanca">
                  تومان
                </Text>
                <Text fontSize="xl" color="gray.500">
                  /ماهانه
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.800")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                {option2.map((option, idx) => (
                  <ListItem
                    key={idx}
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    {option}
                  </ListItem>
                ))}
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red">
                  خرید
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12} borderBottom='1px solid #eee'>
            <Text fontWeight="500" fontSize="2xl">
              حرفه ای
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="4xl" fontWeight="900">
                ۲۰۰۰۰۰
              </Text>
              <Text fontSize="3xl" fontWeight="600" fontFamily="Casablanca">
                تومان
              </Text>
              <Text fontSize="xl" color="gray.500">
                /ماهانه
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.800")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              {option1.map((option, idx) => (
                <ListItem key={idx} display="flex" alignItems="center" gap={1}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {option}
                </ListItem>
              ))}
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline">
                خرید
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
