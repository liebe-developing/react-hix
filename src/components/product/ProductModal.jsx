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
import { useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { apiPostRequest, apiPutRequest } from "../../api/apiRequest";
import Field from "../Field";
import { numberToWords } from "@persian-tools/persian-tools";
import InputForm from "./InputForm";
import PrimaryButton from "../PrimaryButton";
import Loading from "../Loading";

const ProductModal = ({ isOpen, onClose, dataContentModal }) => {
  const { userToken, userContent } = useOutletContext();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    id,
    url,
    title,
    description,
    image,
    brand,
    status,
    price,
    category,
    attributes,
    weight,
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
    category_title: category,
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

  const handleChangeCheckbox = () => {
    setProductFormData({ status: !productFormData.status });
  };

  const handleEditProduct = (e) => {
    e.preventDefault();

    setLoading(true);

    apiPutRequest(`/api/product/`, userToken, productFormData)
      .then((res) => {
        console.log(res);
        toast({
          title: `تغییرات اعمال شد!`,
          status: "success",
          position: "top",
          isClosable: true,
        });
        setLoading(false);
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
            mt={12}
            px={2}
            pb={0}
          >
            <form onSubmit={handleEditProduct}>
              <Flex
                gap={4}
                w="full"
                h="full"
                justifyContent="center"
                alignItems={{ base: "center", md: "start" }}
                flexDir={{ base: "column", md: "row" }}
              >
                <Box
                  flex={{ base: 1.5, md: 1 }}
                  h={{ base: "300px", md: "full" }}
                  w={{ base: "95%", md: 350 }}
                  pos="sticky"
                  top={0}
                  right={0}
                >
                  {dataContentModal.image && (
                    <Image
                      w="full"
                      h="full"
                      objectFit="cover"
                      name={productFormData.title}
                      src={dataContentModal.image}
                      loading="lazy"
                      rounded="md"
                      // className="shadow-sm mix-blend-normal object-contain mx-auto block"
                    />
                  )}
                  <PrimaryButton
                    title={
                      loading ? (
                        <Loading emColor="orange.200" color="orange.500" />
                      ) : (
                        "ذخیره تغییرات"
                      )
                    }
                    type="submit"
                    w="full"
                    mt="4"
                    mb="0"
                    rounded="none"
                  />
                </Box>
                <Box flex={1.5} mx={5} mb={4} w="95%">
                  <SimpleGrid mb={5} columns={[1, null, 2]} spacing={5}>
                    <InputForm
                      handleChange={handleChange}
                      productFormData={productFormData}
                    />
                  </SimpleGrid>

                  <Checkbox
                    colorScheme={
                      productFormData.status === true ? "green" : "red"
                    }
                    isChecked
                    onChange={handleChangeCheckbox}
                  >
                    {productFormData.status ? "موجود" : "ناموجود"}
                  </Checkbox>
                </Box>
              </Flex>
            </form>
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
