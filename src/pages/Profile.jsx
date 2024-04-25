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
  useColorModeValue,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { Field, Loading, PrimaryButton } from "../components";
import { useEffect, useRef, useState } from "react";
import { apiGetRequest, apiPutRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { encode } from "base64-arraybuffer";
const Profile = () => {
  const fileInput = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { userToken, userContent, setAvatar } = useOutletContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    numberPhone: "",
    birth: "",
    codeAcount: "",
    idNumber: "",
    avatarUrl: "",
    selectedAvatarFile: null,
  });

  useEffect(() => {
    apiGetRequest(`api/user/${userContent.user.id}`, userToken)
      .then((res) => {
        const response = res.data.data.user;
        setFormData({
          name: response.name,
          email: response.email,
          address: response.address,
          numberPhone: response.mobile,
          birth: response.birth,
          idNumber: response.code_meli,
          password: response.password,
          avatarUrl: response.avatar,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    // TODO: / CHANGE LOGIC MODULE
    e.preventDefault();

    setIsLoading(true);

    apiPutRequest("api/user", userToken, {
      name:
        formData?.name && formData?.name.trim().length > 0
          ? formData?.name.trim()
          : undefined,
      mobile:
        formData?.numberPhone && formData?.numberPhone.trim().length > 0
          ? formData?.numberPhone.trim()
          : undefined,
      address:
        formData?.address && formData?.address.trim().length > 0
          ? formData?.address.trim()
          : undefined,
      email:
        formData?.email && formData?.email.trim().length > 0
          ? formData?.email.trim()
          : undefined,
      // password: formData?.password && formData?.password.trim().length > 0 ? formData?.password.trim() : undefined,
      code_meli:
        formData?.idNumber && formData?.idNumber.trim().length > 0
          ? formData?.idNumber.trim()
          : undefined,
      birth:
        formData?.birth && formData?.birth.trim().length > 0
          ? formData?.birth.trim()
          : undefined,
      avatar:
        formData?.selectedAvatarFile &&
        formData?.selectedAvatarFile.name &&
        formData?.selectedAvatarFile.data
          ? {
              ...formData?.selectedAvatarFile,
              dataUrl: undefined,
            }
          : formData?.avatarUrl,
    })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: `بروزرسانی با موفقیت انجام شد`,
            status: "success",
            position: "bottom",
          });
          setAvatar(res?.data?.data?.avatar);
          setIsLoading(false);
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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
    const urlReader = new FileReader();
    const waitForFilePromise1 = new Promise((resolve) => {
      reader.onload = async (e) => {
        const result = e.target.result;
        resolve(encode(result));
      };
    });
    const waitForFilePromise2 = new Promise((resolve) => {
      urlReader.onload = async (e) => {
        const result = e.target.result;
        resolve(result);
      };
    });
    reader.readAsArrayBuffer(e.target.files[0]);
    urlReader.readAsDataURL(e.target.files[0]);
    const imageBase64 = await waitForFilePromise1;
    const imageDataUrl = await waitForFilePromise2;
    setFormData({
      ...formData,
      selectedAvatarFile: {
        name: e.target.files[0].name,
        dataUrl: imageDataUrl,
        data: imageBase64,
      },
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
          <img
            src={
              formData.selectedAvatarFile
                ? formData.selectedAvatarFile.dataUrl
                : formData.avatarUrl
                ? formData.avatarUrl
                : "/avatar.webp"
            }
            style={{
              border: "2px solid #3e256b",
              boxShadow: useColorModeValue("6px 6px 12px #bebebe ,-6px -6px 12px #ffffff", 
              "6px 6px 12px #464646 ,-6px -6px 12px #333")
            }}
            className="rounded-full w-20 h-20 md:w-32 md:h-32 shadow-2xl "
          />
          <Flex flexDir="column">
            <Field
              type="file"
              display="none"
              accept=".png, .jpeg"
              onChange={fileSelectedHandler}
              reference={fileInput}
            >
              <PrimaryButton
                btnFn={() => fileInput.current.click()}
                title="ویرایش تصویر پروفایل"
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
          title={
            isLoading ? (
              <Loading emColor="orange.100" color="orange.400" size="lg" />
            ) : (
              "ذخیره تغییرات"
            )
          }
          mr={{ base: 0, md: 4 }}
          btnFn={handleSubmit}
        />
      </form>
    </Box>
  );
};

export default Profile;
