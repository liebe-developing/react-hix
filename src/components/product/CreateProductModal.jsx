/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import PrimaryButton from "../PrimaryButton";
import Field from "../Field";
import { useRef, useState } from "react";
import { apiPostRequest } from "../../api/apiRequest";

const CreateProductModal = ({ isOpen, onClose }) => {
  const fileInput = useRef(null);

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
  } = productFormData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileSelectedHandler = (e) => {
    setProductFormData({
      image: e.target.files[0],
    });
  };

  const handleSubmitNewProduct = (e) => {
    e.preventDefault();

    setLoading(true);

    apiPostRequest("/api/product", undefined, productFormData)
      .then(function (res) {
        console.log(res);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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
                value={title}
                placeholder="عنوان محصول"
                style={{ border: "1px solid gray" }}
                name="title"
                onChange={handleChange}
              />
              <Field
                label="توضیحات"
                value={description}
                placeholder="توضیحات درباره محصول"
                style={{ border: "1px solid gray" }}
                name="description"
                onChange={handleChange}
              />
              <Field
                label="قیمت"
                value={price}
                placeholder="قیمت محصول"
                style={{ border: "1px solid gray" }}
                name="price"
                onChange={handleChange}
              />
              <Field
                label="ویژگی ها"
                value={attributes}
                placeholder="ویژگی های محصول"
                style={{ border: "1px solid gray" }}
                name="attributes"
                onChange={handleChange}
              />
              <Field
                label="وزن"
                value={weight}
                placeholder="وزن محصول"
                style={{ border: "1px solid gray" }}
                name="weight"
                onChange={handleChange}
              />
              <Field
                label="برند"
                value={brand}
                placeholder="برند محصول"
                style={{ border: "1px solid gray" }}
                name="brand"
                onChange={handleChange}
              />
              <Field
                label="دسته بندی"
                value={category_title}
                placeholder="دسته بندی محصول"
                style={{ border: "1px solid gray" }}
                name="category_title"
                onChange={handleChange}
              />
              <Field
                label="URL"
                value={url}
                placeholder="آدرس اینترنتی محصول"
                style={{ border: "1px solid gray" }}
                name="url"
                onChange={handleChange}
              />

              <Field
                label="عکس محصول"
                type="file"
                display="none"
                accept=".png, .jpeg"
                onChange={fileSelectedHandler}
                reference={fileInput}
              >
                <Flex alignItems="center" gap={5} mb={2}>
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="whatsapp"
                    onClick={() => fileInput.current.click()}
                  >
                    انتخاب فایل
                  </Button>
                  <Text fontSize="13px">{image?.name || image}</Text>
                </Flex>
              </Field>
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
                "ذخیره محصول"
              )}
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;
