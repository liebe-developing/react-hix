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
  useToast,
  Input,
  SimpleGrid,
  Heading,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { apiPostRequest, apiPutRequest } from "../../api/apiRequest";
import Field from "../Field";
import { numberToWords } from "@persian-tools/persian-tools";
import InputForm from "./InputForm";

const ProductModal = ({ isOpen, onClose, dataContentModal }) => {
  const { userToken, userContent } = useOutletContext();
  const toast = useToast();

  const {
    url,
    title,
    description,
    image,
    price,
    attributes,
    weight,
    brand,
    category_title,
    id,
    status,
  } = dataContentModal;

  const [productFormData, setProductFormData] = useState({
    id: id,
    url: url,
    title: title,
    description: description,
    image: image,
    brand: brand,
    status: status,
    price: price,
    category_title: category_title,
    attributes: attributes,
    weight: weight,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCecked = () => {
    setProductFormData({ status: !productFormData.status });
  };

  // BACK-END SENDE DATA

  const dataSend = () => {
    apiPutRequest(`/api/product/`, userToken, productFormData)
      .then((res) => {
        toast({
          title: `تغییرات اعمال شد!`,
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `خطایی رخ داده است!`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  };

  return (
    dataContentModal && (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size="6xl"
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
            <Flex
              gap={4}
              w="full"
              h="full"
              justifyContent="center"
              alignItems="start"
            >
              <Box
                flex={1}
                h={{ base: 350, md: "full" }}
                // minW={{ base: "auto", md: 400 }}
                // className="group sm:sticky top-0 max-sm:mb-3 right-0"
              >
                {image && (
                  <Image
                    w="full"
                    h="full"
                    objectFit="cover"
                    name={title}
                    src={image}
                    loading="lazy"
                    // className="shadow-sm mix-blend-normal object-contain mx-auto block"
                  />
                )}
              </Box>
              <Box flex={1.5} mx={5}>
                <SimpleGrid mb={5} columns={[1, null, 2]} spacing={5}>
                  <InputForm
                    handleChange={handleChange}
                    productFormData={productFormData}
                  />
                </SimpleGrid>

                <Checkbox
                  className={`
                    ${
                      status === true
                        ? "text-3xl text-green-400"
                        : "text-3xl text-red-400"
                    }
                  `}
                  name="status"
                  checked={status}
                  type="checkbox"
                  onChange={handleChangeCecked}
                >
                  {status === true ? "موجود" : "ناموجود"}
                </Checkbox>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
};

export default ProductModal;

//  content data
// attributes: ""

// brand: "Nitu"

// category_id: 10

// description: "نوع:تبدیل,نوع رابط:MICRO USB به USB"

// id: 25

// image: "https://static.fafait.net/img/480-480-/media/products/332/248308.png.webp"

// price: 69000

// status: true

// title: "تبدیل OTG USB به Micro-USB نیتو مدل NT-CN17"

// url: "https://fafait.net/product/42963"

// user_plan_id: 1
