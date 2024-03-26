import { Box, Heading, Image, Text, Flex } from "@chakra-ui/react";
import { popularClients } from "../../constants";
import { Link } from "react-router-dom";

const PopularClients = () => {
  return (
    <Box
      boxShadow="4px 4px 0px 0px rgba(0, 0, 0, 1)"
      py={6}
      px={1}
      mt={12}
      border="1px solid #000"
    >
      <Heading
        fontSize={{ base: "16px", md: "19px" }}
        fontWeight="bold"
        letterSpacing="1px"
        mb={4}
        px={5}
      >
        مشتریان محبوب
      </Heading>

      {popularClients.map((item, i) => (
        <Flex
          key={i}
          fontSize={{ base: "10px", md: "14px" }}
          fontWeight="bold"
          alignItems="center"
          justifyContent="space-between"
          borderBottom={"1px solid #D1D1D1"}
          _last={{ borderBottom: "none" }}
          py={5}
          mx={{ base: 2, md: 8 }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Image src={item.avatar} title={item.name} />
            {item.name}
          </Box>
          <Box>
            <Text
              bgColor="#3C096C"
              p="4px 12px"
              borderRadius="50px"
              color="white"
              textAlign="center"
            >
              {item.username}
            </Text>
          </Box>
          <Box>{item.totalPurchase}</Box>
          <Box color={"#3C096C"}>
            <Link to="#">جزئیات حساب</Link>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default PopularClients;
