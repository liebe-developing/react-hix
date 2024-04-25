/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
} from "@chakra-ui/react";
import PrimaryButton from "../PrimaryButton";
import Field from "../Field";
import { useRef, useState } from "react";
import { apiPostRequest } from "../../api/apiRequest";
import { useToast } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { numberToWords } from "@persian-tools/persian-tools";
import InputForm from "./InputForm";
import Loading from "../Loading";

const CreateProductModal = ({ isOpen, onClose }) => {
  const priceNumInput = useRef(null);

  const toast = useToast();
  const { userToken, userContent } = useOutletContext();
  const [productFormData, setProductFormData] = useState({
    url: "",
    title: "",
    description: "",
    image: "",
    price: "",
    attributes: "",
    weight: "",
    brand: "",
    category_title: "",
  });
  const [loading, setLoading] = useState(false);

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

  const handleSubmitNewProduct = (e) => {
    e.preventDefault();

    setLoading(true);

    apiPostRequest(`/api/product/`, userToken, {
      ...productFormData,
      user_plan_id: userContent.user_plan_id,
    })
      .then(function (res) {
        if (res.status === 200) {
          window.location.reload();
        }
        toast({
          title: `ذخیره با موفقعیت انجام شد!`,
          status: "success",
          position: "bottom",
          isClosable: false,
        });

        setLoading(false);
        setProductFormData({
          url: "",
          title: "",
          description: "",
          image: "",
          price: "",
          attributes: "",
          weight: "",
          brand: "",
          category_title: "",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: `خطایی رخ داده است!`,
          status: "error",
          position: "bottom",
          isClosable: false,
        });
        setLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmitNewProduct}>
          <ModalHeader textAlign="left">محصول جدید</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={[1, null, 2]} spacing={6} mb={5}>
              <InputForm
                handleChange={handleChange}
                productFormData={productFormData}
                priceNumInput={priceNumInput}
              />
            </SimpleGrid>
            <PrimaryButton type="submit">
              {loading ? (
                <Loading emColor="gray.200" color="orange.500" />
              ) : (
                "ثبت محصول"
              )}
            </PrimaryButton>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;

// const fileSelectedHandler = (e) => {
//   setProductFormData({
//     image: e.target.files[0],
//   });
// };
