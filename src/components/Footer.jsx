import { Badge, Flex, Text, useColorMode, useTheme } from "@chakra-ui/react";
import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

export default function Footer({ userContent }) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      className={`w-full border-t ${
        colorMode === "light"
          ? "border-gray-300 text-black"
          : "border-black text-white"
      }`}
      bg={colorMode === "light" ? "#eee" : "#1a202c"}
      py={4}
      px={6}
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <a href="https://portal.hixdm.com/">
          <Text fontSize={"small"}>تمامی حقوق محفوظ است.</Text>
        </a>
        <a href="https://portal.hixdm.com/">
          <img className="inline" src="/logo_hix.svg" alt="" width={50} />
        </a>
      </Flex>

      {/* mobile */}

      <Flex flexDir={"row"} gap={2} alignItems="center">
        <Link
          to={
            userContent.user_plan_id
              ? "/"
              : userContent.user.operator_user_plan_id
              ? "/chats"
              : "/price-plan"
          }
          className="text-[13px] md:text-md hover:bg-[#3E256B] rounded-md hover:text-white p-2  duration-300"
        >
          صفحه اصلی
        </Link>
        <Link
          to={"/termsofservices"}
          className="text-[13px] md:text-md p-2 rounded-md hover:bg-[#3E256B] hover:text-white duration-300"
        >
          قوانین
        </Link>
        <Text colorScheme="purple" fontFamily="monospace" fontWeight='bold'>v0.1.0</Text>
      </Flex>
    </Flex>
  );
}
