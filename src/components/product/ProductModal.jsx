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
import { useState } from "react";
import { Link } from "react-router-dom";


const ProductModal = ({ isOpen, onClose, dataContentModal }) => {
  const {
    description,
    image,
    price,
    status,
    title
  } = dataContentModal;

  const [formData, setFormData] = useState({
    name: title,
    price: price,
    caption: description,
    image: image,
    status: status,
    image: image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  // BACK-END SENDE DATA

  const dataSend = ()=>{
    // send data
    // (urlوارد نمایید!)
  }



  return (
    (dataContentModal && <Modal
      onClose={onClose}
      isOpen={isOpen}
      size="4xl"
      isCentered
      scrollBehavior={""}
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
          <Flex className="w-full max-sm:flex-col max-sm:px-4 mx-2   py-2 relative ">
            <Box
              h={{ base: 350, md: 540 }}
              minW={{ base: "auto", md: 400 }}
              maxW={{ base: "auto", md: 400 }}
              className="group sm:sticky top-0 max-sm:mb-3 right-0"
              onClick={dataSend}
            >
              <img w="full" h="full" src={image} className="shadow-md" />
              <Link state={dataContentModal} className="max-sm:mb-20">
                <Button
                  title="مشاهده جزئیات"
                  pos={{ base: "", md: "absolute" }}
                  bottom="0"
                  color={useColorModeValue("#22c35e", "green.300")}
                  rounded
                  w="full"
                  _groupHover={{ opacity: 1 }}
                  className="max-sm:rounded-xl group-hover:transition group-hover:duration-500 ease-in-out "
                >
                  ویرایش
                </Button>
              </Link>
            </Box>
            <Box className=" mx-4 max-sm:mt-14">
              <Box>
                درباره
              </Box>
              <Box w="100%">
                <textarea value={formData.name} name="name" className="w-full h-20" onChange={handleChange}></textarea>
              </Box>
              <Text
                className="sm:text-lg text-lg font-extrabold"
                color={useColorModeValue("#22c35e", "green.300")}
                mt={2}
              >
                <span className="mx-5">قیمت<input type="number" name="price" 
                onChange={handleChange}
                className="mx-5 border-2" value={formData.price} /></span>
              </Text>
              <UnorderedList className="my-4">ویژگی ها</UnorderedList>

              <Box mt={5} className="text-xs">
                اطلاعات
              </Box>
              <Text className="sm:text-lg mt-1 text-md font-extrabold">
                <textarea value={formData.caption} type="text" name="caption" onChange={handleChange} className="w-full h-32" ></textarea>
              </Text>
              {/* IMAGE */}
              <Box mt={12} className="text-xs">
                عکس 
              </Box>
              <Text className="sm:text-lg mt-1 text-md font-extrabold">
                <textarea value={formData.image} type="text" name="image" onChange={handleChange} className="w-full h-20" ></textarea>
              </Text>
              <Box >
                وضعیت
              </Box>
              <h3 className={status === true ? 'text-3xl text-green-400' : 'text-3xl text-red-400'} >
                {status === true ? 'موجود' : 'ناموجود'}
                <span>
                  <input type="checkbox" value={formData.status} onChange={handleChange} className="mr-5 w-5 h-5" />
                </span>
              </h3>
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
