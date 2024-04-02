/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { popularProducts } from "../../constants";

const PopularProducts = () => {
  return (
    <Box
      boxShadow={useColorModeValue(
        "4px 4px 0px 0px #000000",
        "4px 4px 0px 0px #00000036"
      )}
      w="full"
      p={6}
      mt={12}
      border={useColorModeValue("1px solid #000", "1px solid gray.500")}
    >
      <Flex flexDir="column" gap={4}>
        <Heading fontSize={{ base: "16px", md: "19px" }} letterSpacing="1px">
          پرطرفدار ترین محصولات
        </Heading>
        <Text
          color={useColorModeValue("#000", "gray.300")}
          opacity={0.5}
          fontSize={{ base: "12px", md: "14px" }}
        >
          پر فروش‌ ترین محصولات یک ماه گذشته کسب و کار شما
        </Text>
        {popularProducts.map((item, i) => (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            borderBottom={"2px solid rgba(255, 109, 0, 0.5)"}
            _last={{ borderBottom: "none" }}
            key={i}
            mx={{ base: 2, md: 8 }}
            py={5}
          >
            <Box>
              <Flex gap={4} alignItems="center">
                <Image src={item.productImg} title={item.title} />
                <Text>{item.title}</Text>
              </Flex>
            </Box>
            <Box
              display="flex"
              gap={2}
              color={useColorModeValue("#000", "gray.300")}
              opacity={0.6}
            >
              <Text>{item.quantity}</Text>
              <Text>عدد</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default PopularProducts;
