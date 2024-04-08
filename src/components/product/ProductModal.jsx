/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  UnorderedList,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductModal = ({ isOpen, onClose, product }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      size="4xl"
      isCentered
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent mx={4} rounded="xl">
        <ModalCloseButton />
        <ModalBody
          // h="200px"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: useColorModeValue("#d3d3d3", "#4f5765"),
              borderRadius: "24px",
            },
          }}
          mt={10}
          px={0}
          pb={0}
          className="pl-[1px] relative"
        >
          <Flex className="w-full max-sm:flex-col max-sm:px-4 relative ">
            <Box
              h={{ base: 350, md: 540 }}
              minW={{ base: "auto", md: 400 }}
              maxW={{ base: "auto", md: 400 }}
              className="group sm:sticky top-0 max-sm:mb-3 right-0"
            >
              <Image w="full" h="full" src={""} objectFit="contain" />
              <Link state={product} className="max-sm:mb-20">
                <Button
                  title="مشاهده جزئیات"
                  pos={{ base: "", md: "absolute" }}
                  bottom="0"
                  opacity={{ base: 1, md: 0 }}
                  rounded
                  w="full"
                  _groupHover={{ opacity: 1 }}
                  className="max-sm:rounded-xl group-hover:transition group-hover:duration-500 ease-in-out "
                >
                  test
                </Button>
              </Link>
            </Box>
            <Box className="pb-4 mx-4 max-sm:mt-14">
              <Text
                noOfLines={2}
                maxW="inherit"
                className="sm:text-[20px] leading-9 hover:text-[#22c35e] transition duration-200 ease-in-out text-sm font-semibold mb-4"
                color={useColorModeValue("gray.700", "gray.300")}
              >
                <Link>عنوان</Link>
              </Text>
              <Text
                className="sm:text-lg text-lg font-extrabold"
                color={useColorModeValue("#22c35e", "green.300")}
              >
                قیمت
              </Text>
              <UnorderedList className="my-4">ویژگی ها</UnorderedList>

              <Box mt={12} className="text-xs">
                اطلاعات
              </Box>

              <Box my={8}>موجود</Box>

              <Flex className="flex-row-reverse justify-end gap-2">
                <Button
                  title="مشاهده جزئیات"
                  pos={{ base: "", md: "absolute" }}
                  bottom="0"
                  opacity={{ base: 1, md: 0 }}
                  rounded
                  w="full"
                  _groupHover={{ opacity: 1 }}
                  className="max-sm:rounded-xl group-hover:transition group-hover:duration-500 ease-in-out "
                >
                  test
                </Button>
                <Box
                  className={`flex items-center gap-2 border ${useColorModeValue(
                    "border-gray-200",
                    "border-gray-500"
                  )}  rounded-lg`}
                >
                  test
                </Box>
              </Flex>
              <Divider pb={3} />

              <Text mt={8} fontSize={{ base: "12px", md: "13px" }}>
                دسته
              </Text>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
