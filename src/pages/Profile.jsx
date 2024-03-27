import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Heading,
  IconButton,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { Field, PrimaryButton } from "../components";

const Profile = () => {
  return (
    <Box>
      <Heading
        fontSize="28px"
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
          <Avatar size="xl" bg="gray.500">
            <AvatarBadge
              as={IconButton}
              size="sm"
              rounded="full"
              top="-10px"
              colorScheme="red"
              aria-label="remove Image"
              icon={<IoClose />}
            />
          </Avatar>
          <PrimaryButton title="عکس خود را آپلود کنید" w="full" />
        </VStack>
      </Center>
      <Heading
        fontSize="28px"
        w="fit-content"
        fontFamily="Casablanca"
        mb={8}
        mt={14}
      >
        جزئیات اکانت
        <Box bg="#FF6D00" w="80%" h={"3px"} m="0 auto" mt={2}></Box>
      </Heading>

      <form>
        <SimpleGrid columns={2} spacing={8} mx={5} mb={12}>
          <Field
            label="نام و نام خانوادگی"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />
          <Field
            label="کد ملی"
            placeholder="کد ملی خود را وارد کنید"
            type="number"
          />
          <Field
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
            type="email"
          />
          <Field
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید"
            type="password"
          />
          <Field label="آدرس" placeholder="آدرس خود را وارد کنید" />
          <Field
            label="شماره تماس"
            placeholder="شماره تماس خود را وارد کنید"
            type="number"
          />
          <Field label="تاریخ تولد" placeholder={"۱۳۷۸/۰۲/۲۲"} />
        </SimpleGrid>
        <PrimaryButton title="ذخیره تغییرات" mr={4} />
      </form>
    </Box>
  );
};

export default Profile;
