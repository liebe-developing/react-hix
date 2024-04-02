import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { Field, PrimaryButton } from "../components";
import { MdArrowDropDown } from "react-icons/md";

const Settings = () => {

  return (
    <Box>
      <Flex alignItems="start" flexDir="column" gap={3}>
        <Heading
          fontSize="28px"
          borderRadius="10px"
          w="fit-content"
          fontFamily="Casablanca"
          // mb={8}
          mt={5}
        >
          تنظیمات
        </Heading>
        <Text color="#000" opacity={0.5}>
          تنظیمات حساب خود را مدیریت کنید
        </Text>
      </Flex>

      <form>
        <SimpleGrid columns={2} spacing={8} my={12}>
          <Field label="عنوان بالای ابزارک" placeholder="پشتیبانی سایت" />
          <Field
            label="توضیح بالای ابزارک"
            placeholder="پاسخگوی سوالات شما هستیم"
          />
          <Field label="پیام خوش آمد گویی" placeholder="متن خوش آمد گویی" />
          <Field label="توضیحات فروشگاه" placeholder="توضیحات" />
          <FormControl>
            <FormLabel fontSize="14px">موقعیت نمایش ابزارک</FormLabel>
            <Select
              _placeholder={{ fontSize: "12px" }}
              icon={<Icon as={MdArrowDropDown} ml={6} />}
            >
              <option value="left">چپ</option>
              <option value="right">راست</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="14px">جلب توجه ابزارک</FormLabel>
            <Select
              _placeholder={{ fontSize: "12px" }}
              icon={<Icon as={MdArrowDropDown} ml={6} />}
            >
              <option value="yes">بله</option>
              <option value="no">خیر</option>
            </Select>
            <FormHelperText fontSize="11px">
              نیاز به حرکت آیکون دارد یا خیر
            </FormHelperText>
          </FormControl>
          <Field label="رنگ ابزارک" type="color" w="30%" />
          <Field
            label="آیکون ابزارک"
            type="file"
            helper="حداکثر 1 مکابایت با پسوند png, jpeg"
            accept="image/png, image/jpeg"
          />
        </SimpleGrid>
        <PrimaryButton  title="ذخیره تغییرات" mr={4} />
      </form>
    </Box>
  );
};

export default Settings;
