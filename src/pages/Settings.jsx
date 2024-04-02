import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Field, PrimaryButton } from "../components";
import { MdArrowDropDown } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { apiGetRequest, apiPostRequest } from "../api/apiRequest";
import { useOutletContext } from 'react-router-dom'

const Settings = () => {
  const fileInput = useRef(null);
  const { userToken, userContent } = useOutletContext()

  const [formData, setFormData] = useState({
    widgetTitle: "",
    widgetDescription: "",
    welcomeMessage: "",
    storeDescription: "",
    widgetPosition: 0,
    widgetColor: "",
    iconUrl: "",
    selectedWidgetFile: null,
  });

  useEffect(() => {
    apiGetRequest(`api/settings/${userContent.user_plan_id}`, userToken).then(res => {
      console.log(res.data)
      setFormData({
        widgetTitle: res.data.data.title,
        widgetDescription: res.data.data.caption,
        welcomeMessage: res.data.data.welcome,
        storeDescription: res.data.data.description,
        widgetPosition: res.data.data.pos,
        widgetColor: res.data.data.color,
        iconUrl: res.data.data.icon
      })
    })


  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileSelectedHandler = (e) => {
    setFormData({
      selectedWidgetFile: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    selectedWidgetFile &&
      fd.append("image", selectedWidgetFile, selectedWidgetFile?.name);

    apiPostRequest("")
  };

  return (
    <Box>
      <Flex alignItems="start" flexDir="column" gap={3}>
        <Heading
          fontSize="28px"
          borderRadius="10px"
          w="fit-content"
          fontFamily="Casablanca"
          mt={5}
        >
          تنظیمات
        </Heading>
        <Text color="#000" opacity={0.5}>
          تنظیمات حساب خود را مدیریت کنید
        </Text>
      </Flex>

      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={2} spacing={8} my={12}>
          <Field
            label="عنوان بالای ابزارک"
            placeholder="پشتیبانی سایت"
            onChange={handleChange}
            value={formData.widgetTitle}
            name="widgetTitle"
          />
          <Field
            label="توضیح بالای ابزارک"
            placeholder="پاسخگوی سوالات شما هستیم"
            onChange={handleChange}
            value={formData.widgetDescription}
            name="widgetDescription"
          />
          <Field
            onChange={handleChange}
            label="پیام خوش آمد گویی"
            placeholder="متن خوش آمد گویی"
            value={formData.welcomeMessage}
            name="welcomeMessage"
          />
          <Field
            onChange={handleChange}
            label="توضیحات فروشگاه"
            placeholder="توضیحات"
            value={formData.storeDescription}
            name="storeDescription"
          />
          <FormControl>
            <FormLabel fontSize="14px">موقعیت نمایش ابزارک</FormLabel>
            <Select
              onChange={handleChange}
              name="widgetPosition"
              value={formData.widgetPosition}
              _placeholder={{ fontSize: "12px" }}
              icon={<Icon as={MdArrowDropDown} ml={6} />}
            >
              <option value="0">چپ</option>
              <option value="1">راست</option>
            </Select>
          </FormControl>
          <Field
            label="رنگ ابزارک"
            type="color"
            w="30%"
            onChange={handleChange}
            value={formData.widgetColor}
            name="widgetColor"
          />
          <Flex flexDir="column">
            <Field
              label="آیکون ابزارک"
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
                <Text fontSize="13px">{formData.selectedWidgetFile?.name || formData.iconUrl}</Text>
              </Flex>
            </Field>
            <Text fontSize="11px" color={"gray.600"}>
              حداکثر 1 مکابایت با پسوند png, jpeg
            </Text>
            {formData.selectedWidgetFile?.size > 1000000 && (
              <Alert status="error" dir="rtl" mt={4} fontSize="13px">
                <AlertIcon />
                <AlertTitle>
                  حجم فایل انتخابی باید کمتر از 1 مگابایت باشد
                </AlertTitle>
              </Alert>
            )}
          </Flex>
        </SimpleGrid>
        <PrimaryButton
          title="ذخیره تغییرات"
          mr={4}
          type="submit"
          isDisabled={formData.selectedWidgetFile?.size > 1000000}
        />
      </form>
    </Box>
  );
};

export default Settings;
