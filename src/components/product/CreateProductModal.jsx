/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import PrimaryButton from "../PrimaryButton";
import Field from "../Field";
import { useRef, useState } from "react";
import { apiPostRequest } from "../../api/apiRequest";
import { useToast } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";

const CreateProductModal = ({ isOpen, onClose }) => {
  const toast = useToast()
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
    setProductFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitNewProduct = (e) => {
    e.preventDefault();

    setLoading(true);

    apiPostRequest(`/api/product/`, userToken, {
      url: productFormData.url,
      title:       productFormData.title,
      description:       productFormData.description,
      image:       productFormData.image,
      price:       productFormData.price,
      attributes:       productFormData.attributes,
      user_plan_id: userContent.user_plan_id,
      weight:       productFormData.weight,
      brand:       productFormData.brand,
      category_title:       productFormData.category_title,
})
      .then(function (res) {
        toast({
          title: `ذخیره با موفقعیت انجام شد!`,
          status: "success",
          position: "bottom",
          isClosable: true,
        });

        setLoading(false);
      })
      .catch((error) => {
        toast({
          title: `فلید ها را درست وارد نمایید!`,
          status: "error",
          position: "bottom",
          isClosable: true,
        });
        setLoading(false)

      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmitNewProduct}>
          <ModalHeader textAlign="left">محصول جدید</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={[1, null, 2]} spacing={6}>
              <Field
                label="عنوان"
                value={productFormData.title}
                placeholder="عنوان محصول"
                style={{ border: "1px solid gray" }}
                name="title"
                onChange={handleChange}
              />
              <Field
                label="توضیحات"
                value={productFormData.description}
                placeholder="توضیحات درباره محصول"
                style={{ border: "1px solid gray" }}
                name="description"
                onChange={handleChange}
              />
              <Field
                label="قیمت"
                value={productFormData.price}
                placeholder="قیمت محصول"
                style={{ border: "1px solid gray" }}
                name="price"
                onChange={handleChange}
              />
              <Field
                label="ویژگی ها"
                value={productFormData.attributes}
                placeholder="ویژگی های محصول"
                style={{ border: "1px solid gray" }}
                name="attributes"
                onChange={handleChange}
              />
              <Field
                label="وزن"
                value={productFormData.weight}
                placeholder="وزن محصول"
                style={{ border: "1px solid gray" }}
                name="weight"
                onChange={handleChange}
              />
              <Field
                label="برند"
                value={productFormData.brand}
                placeholder="برند محصول"
                style={{ border: "1px solid gray" }}
                name="brand"
                onChange={handleChange}
              />
              <Field
                label="دسته بندی"
                value={productFormData.category_title}
                placeholder="دسته بندی محصول"
                style={{ border: "1px solid gray" }}
                name="category_title"
                onChange={handleChange}
              />
              <Field
                label="URL"
                value={productFormData.url}
                placeholder="آدرس اینترنتی محصول"
                style={{ border: "1px solid gray" }}
                name="url"
                onChange={handleChange}
              />

              <Field
                label="عکس محصول (url وارد نمایید!)"
                value={productFormData.image}
                placeholder="آدرس اینترنتی محصول"
                style={{ border: "1px solid gray" }}
                name="image"
                onChange={handleChange}
              />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter dir="ltr">
            <PrimaryButton type="submit">
              {loading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="orange"
                  size="lg"
                />
              ) : (
                "! ثبت محصول"
              )}
            </PrimaryButton>
          </ModalFooter>
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