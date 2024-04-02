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
import { useRef, useState } from "react";

const Settings = () => {
  const fileInput = useRef(null);

  const [formData, setFormData] = useState({
    widgetTitle: "",
    widgetDescription: "",
    welcomeMessage: "",
    storeDescription: "",
    widgetPosition: "",
    widgetAttention: false,
    widgetColor: "",
    selectedWidgetFile: null,
  });

  const {
    widgetTitle,
    widgetDescription,
    welcomeMessage,
    storeDescription,
    widgetPosition,
    widgetColor,
    widgetAttention,
    selectedWidgetFile,
  } = formData;

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

    console.log(formData);
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
            value={widgetTitle}
            name="widgetTitle"
          />
          <Field
            label="توضیح بالای ابزارک"
            placeholder="پاسخگوی سوالات شما هستیم"
            onChange={handleChange}
            value={widgetDescription}
            name="widgetDescription"
          />
          <Field
            onChange={handleChange}
            label="پیام خوش آمد گویی"
            placeholder="متن خوش آمد گویی"
            value={welcomeMessage}
            name="welcomeMessage"
          />
          <Field
            onChange={handleChange}
            label="توضیحات فروشگاه"
            placeholder="توضیحات"
            value={storeDescription}
            name="storeDescription"
          />
          <FormControl>
            <FormLabel fontSize="14px">موقعیت نمایش ابزارک</FormLabel>
            <Select
              onChange={handleChange}
              name="widgetPosition"
              value={widgetPosition}
              _placeholder={{ fontSize: "12px" }}
              icon={<Icon as={MdArrowDropDown} ml={6} />}
            >
              <option value="چپ">چپ</option>
              <option value="راست">راست</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="14px">جلب توجه ابزارک</FormLabel>
            <Select
              onChange={handleChange}
              name="widgetAttention"
              value={widgetAttention}
              _placeholder={{ fontSize: "12px" }}
              icon={<Icon as={MdArrowDropDown} ml={6} />}
            >
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
            </Select>
            <FormHelperText fontSize="11px">
              نیاز به حرکت آیکون دارد یا خیر
            </FormHelperText>
          </FormControl>
          <Field
            label="رنگ ابزارک"
            type="color"
            w="30%"
            onChange={handleChange}
            value={widgetColor}
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
                <Text fontSize="13px">{selectedWidgetFile?.name}</Text>
              </Flex>
            </Field>
            <Text fontSize="11px" color={"gray.600"}>
              حداکثر 1 مکابایت با پسوند png, jpeg
            </Text>
            {selectedWidgetFile?.size > 1000000 && (
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
          isDisabled={selectedWidgetFile?.size > 1000000}
        />
      </form>
    </Box>
  );
};

export default Settings;
