/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useToast,
  SimpleGrid,
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
  const [loading, setLoading] = useState(false);

  const { userToken, userContent } = useOutletContext();

  const toast = useToast();

  const priceNumInput = useRef(null);

  const [productFormData, setProductFormData] = useState({
    id: dataContentModal.id,
    url: dataContentModal.url,
    title: dataContentModal.title,
    description: dataContentModal.description,
    image: dataContentModal.image,
    brand: dataContentModal.brand,
    status: dataContentModal.status,
    price: dataContentModal.price,
    category_title: dataContentModal.category,
    attributes: dataContentModal.attributes,
    // weight: dataContentModal.weight,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let priceNum = priceNumInput.current.value;
    if (priceNum.length == 17) {
      return false;
    }
    setProductFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = () => {
    setProductFormData((pState) => ({...pState, status: !productFormData.status }));
  };

  const handleEditProduct = (e) => {
    e.preventDefault();

    setLoading(true);

    apiPutRequest(`/api/product/`, userToken, productFormData)
      .then((res) => {
        console.log(productFormData);
        toast({
          title: `تغییرات اعمال شد!`,
          status: "success",
          position: "top",
        });
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        isOpen();
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
                  h={{ base: "auto", md: "440px" }}
                  minH={{ base: "300px", md: "440px" }}
                  w={{ base: "95%", md: 350 }}
                  top={0}
                  right={0}
                >
                  {dataContentModal.image && (
                    <Image
                      w="100%"
                      h="70%"
                      objectFit="contain"
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
                        <Loading
                          emColor="orange.200"
                          color="orange.500"
                          size="lg"
                        />
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
                      priceNumInput={priceNumInput}
                    />
                  </SimpleGrid>

                  <Checkbox
                    colorScheme={
                      productFormData.status === true ? "green" : "none"
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

