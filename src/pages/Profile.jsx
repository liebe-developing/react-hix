import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { Field, PrimaryButton } from "../components";
import { useEffect, useRef, useState } from "react";
import { apiGetRequest, apiPutRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { encode } from "base64-arraybuffer";
const Profile = () => {
  const fileInput = useRef(null);

  const toast = useToast();
  const { userToken, userContent } = useOutletContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    numberPhone: "",
    birth: "",
    codeAcount: "",
    idNumber: "",
  });

  useEffect(() => {
    apiGetRequest(`api/user/${userContent.user.id}`, userToken)
      .then((res) => {
        console.log(res.data.data.user);
        const response = res.data.data.user;
        setFormData({
          name: response.name,
          email: response.email,
          address: response.address,
          numberPhone: response.mobile,
          birth: response.birth,
          idNumber: response.code_meli,
          password: response.password,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    apiPutRequest("api/user", userToken, {
      name:
        formData.name && formData.name.trim().length > 0
          ? formData.name.trim()
          : undefined,
      mobile:
        formData.numberPhone && formData.numberPhone.trim().length > 0
          ? formData.numberPhone.trim()
          : undefined,
      address:
        formData.address && formData.address.trim().length > 0
          ? formData.address.trim()
          : undefined,
      email:
        formData.email && formData.email.trim().length > 0
          ? formData.email.trim()
          : undefined,
      // password: formData.password && formData.password.trim().length > 0 ? formData.password.trim() : undefined,
      code_meli:
        formData.idNumber && formData.idNumber.trim().length > 0
          ? formData.idNumber.trim()
          : undefined,
      birth:
        formData.birth && formData.birth.trim().length > 0
          ? formData.birth.trim()
          : undefined,
    })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: `بروزرسانی با موفقیت انجام شد`,
            status: "success",
            position: "bottom",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileSelectedHandler = async (e) => {
    const reader = new FileReader();
    const waitForFilePromise = new Promise((resolve) => {
      reader.onload = async (e) => {
        const text = e.target.result;
        resolve(encode(text));
      };
    });
    reader.readAsArrayBuffer(e.target.files[0]);
    const imageBase64 = await waitForFilePromise;
    console.log(imageBase64);
    setFormData({
      ...formData,
      selectedWidgetFile: { name: e.target.files[0].name, data: imageBase64 },
    });
  };

  return (
    <Box m={5}>
      <Heading
        fontSize={{ base: "22px", md: "28px" }}
        borderRadius="10px"
        w="fit-content"
        fontFamily="Casablanca"
        mb={8}
        mt={5}
      >
        عکس پروفایل
        <Box bg="#FF6D00" w="80%" h={"3px"} m="0 auto" mt={2}></Box>
      </Heading>
      <Center>
        <VStack spacing={4}>
          <Avatar
            src={formData.iconUrl}
            size={{ base: "lg", md: "xl" }}
            bg="gray.500"
          >
            <AvatarBadge
              as={IconButton}
              size="sm"
              rounded="full"
              top="-10px"
              colorScheme={"red"}
              aria-label="remove Image"
              icon={<IoClose />}
            />
          </Avatar>
          <Flex flexDir="column">
            <Field
              type="file"
              display="none"
              onChange={fileSelectedHandler}
              reference={fileInput}
            >
              <PrimaryButton
                btnFn={() => fileInput.current.click()}
                title="عکس خود را آپلود کنید"
                w="full"
                size="md"
              />
            </Field>
          </Flex>
        </VStack>
      </Center>
      <Heading
        fontSize={{ base: "22px", md: "28px" }}
        w="fit-content"
        fontFamily="Casablanca"
        mb={8}
        mt={14}
      >
        جزئیات اکانت
        <Box bg="#FF6D00" w="80%" h={"3px"} m="0 auto" mt={2}></Box>
      </Heading>

      <form>
        <SimpleGrid
          columns={[1, null, 2]}
          spacing={{ base: 4, md: 8 }}
          mx={{ base: 0, md: 5 }}
          mb={10}
        >
          <Field
            label="نام و نام خانوادگی"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <Field
            label="کد ملی"
            placeholder="کد ملی خود را وارد کنید"
            type="number"
            value={formData.idNumber}
            name="idNumber"
            onChange={handleChange}
          />
          <Field
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <Field
            label="آدرس"
            placeholder="آدرس خود را وارد کنید"
            value={formData.address}
            name="address"
            onChange={handleChange}
          />
          <Field
            label="شماره تماس"
            placeholder="شماره تماس خود را وارد کنید"
            type="number"
            value={formData.numberPhone}
            name="numberPhone"
            onChange={handleChange}
          />
          <Field
            label="تاریخ تولد"
            placeholder={"۱۳۷۸/۰۲/۲۲"}
            value={formData.birth}
            name="birth"
            onChange={handleChange}
          />
        </SimpleGrid>
        <PrimaryButton
          title="ذخیره تغییرات"
          mr={{ base: 0, md: 4 }}
          btnFn={handleSubmit}
        />
      </form>
    </Box>
  );
};

export default Profile;
