import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const MediaBox = () => {
  return (
    <Box
      background={useColorModeValue(
        "rgba(255, 109, 0, 1)",
        "rgba(255, 109, 0, 0.9)"
      )}
      w={"full"}
      h={"180px"}
      borderRadius={"20px"}
      boxShadow="4px 4px 0px 0px rgba(0, 0, 0, 1)"
      position="relative"
      padding={6}
    >
      <Box>
        <Flex flexDir="column" color="white" gap={4} maxW={500}>
          <Heading
            fontSize={{ base: "13px", md: "20px" }}
            lineHeight="33px"
            fontWeight={700}
          >
            هیکس دی ام در شبکه های اجتماعی
          </Heading>
          <Text
            fontSize={{ base: "10px", md: "13px" }}
            lineHeight="20px"
            fontWeight={500}
            maxW={{ base: "240px", md: "full" }}
          >
            هیکس دم ام را در شبکه های اجتماعی دنبال کنید تا از جدیدترین تخفیف ها
            و اطلاعیه ها با خبر شوید.
          </Text>
          <HStack spacing={2}>
            <Link style={{ zIndex: 1 }} to="#">
              <Icon
                as={FaYoutube}
                boxSize={10}
                color="white"
                bg="#3C096C"
                borderRadius={"50%"}
                padding={2}
                cursor="pointer"
                transition="all 0.3s ease-in-out"
                _hover={{ color: "#3C096C", bg: "white" }}
              />
            </Link>
            <Link style={{ zIndex: 1 }} to="#">
              <Icon
                as={FaFacebook}
                boxSize={10}
                color="white"
                bg="#3C096C"
                borderRadius={"50%"}
                padding={2}
                cursor="pointer"
                transition="all 0.3s ease-in-out"
                _hover={{ color: "#3C096C", bg: "white" }}
              />
            </Link>
          </HStack>
        </Flex>
      </Box>
      <Box pos="absolute" left={0} top={{ base: 5, md: 0 }} zIndex={1}>
        <Image
          w={{ base: 135, md: "auto" }}
          src="./dashboard/Social-tree-cuate.png"
        />
      </Box>
      <Box
        pos="absolute"
        left={0}
        top={0}
        h={"50px"}
        overflow="hidden"
        zIndex={0}
        // transform="rotate(-180deg)"
      >
        <Image
          src="./dashboard/Intersect.svg"
          height="full"
          objectFit="cover"
        />
      </Box>
      <Box
        pos="absolute"
        right={0}
        bottom={0}
        h={"100px"}
        overflow="hidden"
        zIndex={0}
        w="full"
      >
        <Image
          src="./dashboard/Intersect2.svg"
          height="full"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
};

export default MediaBox;
