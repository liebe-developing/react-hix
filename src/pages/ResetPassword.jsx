import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Image,
  FormLabel,
  FormControl,
  useColorModeValue,
  keyframes,
  FormHelperText,
  Alert,
  AlertIcon,
  useToast,
  Center,
  HStack,
  PinInput,
  PinInputField,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPostRequest } from "../api/apiRequest";
import { useSelector } from "react-redux";
import { Loading, PageTitle } from "../components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const moveUpAndDown = keyframes`  
from {transform: translateY(0);}   
to {transform: translateY(-60px)} 
`;
const ResetPassword = () => {
  const [error, setError] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const userToken = useSelector((state) => state?.user?.currentUser?.token);

  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    verify_code: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    userToken && navigate("/");
  }, []);

  const sendEmailHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    apiPostRequest("/api/reset", undefined, { email })
      .then(function (res) {
        setLoading(false);
        toast({
          title: `ایمیل با موفقیت ارسال شد`,
          status: "success",
          position: "top-right",
        });
        setHasEmailBeenSent(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsEmailAvailable(false);
          toast({
            title: `ایمیلی وجود ندارد!`,
            status: "error",
            position: "top-right",
          });
        } else {
          setError(true);
        }
        setLoading(false);
      });
  };

  /* Write the rest of codes to send verify code and new password to database */
  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoadingResetPassword(false);
    apiPostRequest("/api/reset/check",undefined,{
      password : formData.newPassword,
      email,
      verify_code:formData.verify_code 

    }).then(res =>{
      toast({
        title: `رمز عبور شما با موفقیت بروزرسانی شد!`,
        status: "error",
        position: "top-right",
      });
      navigate("/sign-in")
    }).catch(err => {
     if(err.response.status === 404 ){
       toast({
         title: `کد تایید معتبر نمی باشد!`,
         status: "error",
         position: "top-right",
       });
     }else{
       toast({
         title: `خطایی رخ داده است!`,
         status: "error",
         position: "top-right",
       });
     }
    })
  };

  const spinAnimation = `${moveUpAndDown} infinite 2s linear alternate`;

  return (
    <Box position={"relative"} dir="ltr">
      <PageTitle title="بازیابی رمز | دستیار هوشمند هیکس" />
      <Flex
        as={Flex}
        flexDir={{ base: "column-reverse", md: "row" }}
        spacing={{ base: 10, lg: 10 }}
        minH={"100vh"}
        bgImage="/login-register-bg.webp"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
      >
        <Flex flex={1.5} m={{ base: 0, md: 10 }} animation={spinAnimation}>
          <Image
            transform="rotate(2deg)"
            alt={"Login Image"}
            objectFit={"cover"}
            src={"/login-register.webp"}
          />
        </Flex>
        <Flex
          flex={1.2}
          flexDir="column"
          p={{ base: 4, sm: 6, md: 8 }}
          justifyContent={{ base: "start", md: "center" }}
          m={{ base: 2, md: 12 }}
          mt={{ base: 14, md: 0 }}
          mb={{ base: 10, md: 0 }}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"0 0 15px #43FFFF"}
            p={8}
          >
            <Heading
              color={"gray.700"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              fontFamily="Casablanca"
              textAlign="center"
              mb={10}
            >
              بازیابی رمز عبور
            </Heading>
            <form onSubmit={sendEmailHandler}>
              <Flex flexDir="column" gap={4} dir="rtl">
                <FormControl id="email" isRequired>
                  <FormLabel>ایمیل</FormLabel>
                  <Input
                    px="16px"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                  />
                  <FormHelperText fontSize="11px" my={1}>
                    جهت بازیابی ایمیل خود را وارد نمایید.
                  </FormHelperText>
                </FormControl>
                {!hasEmailBeenSent && (
                  <Stack spacing={4}>
                    <Button
                      bg={"cyan.400"}
                      color={"white"}
                      _hover={{
                        bg: "cyan.500",
                      }}
                      type="submit"
                      isDisabled={loading}
                    >
                      {loading ? (
                        <Loading
                          emColor="gray.200"
                          color="blue.500"
                          size="lg"
                        />
                      ) : (
                        "ارسال"
                      )}
                    </Button>
                    <Flex
                      gap={2}
                      alignItems="center"
                      justifyContent="center"
                      fontSize={"13px"}
                    >
                      <Text color={"gray.700"}>حساب کاربری دارید؟</Text>
                      <Link to="/sign-in">
                        <Text color={"blue.400"}>ورود</Text>
                      </Link>
                    </Flex>
                  </Stack>
                )}
              </Flex>
            </form>
            {hasEmailBeenSent && (
              <form onSubmit={handleResetPassword}>
                <Flex flexDir="column" dir="rtl" mt={5}>
                  <Text>کد ارسالی را وارد نمایید</Text>
                  <FormControl mt={2} mb={4}>
                    <Flex dir="ltr" justifyContent="right">
                      <PinInput
                        otp
                        onChange={(e) =>
                          setFormData((prevState) => ({
                            ...prevState,
                            verify_code: e,
                          }))
                        }
                        value={formData.verify_code}
                      >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </Flex>
                  </FormControl>
                  <FormControl id="newpassword" isRequired mb={4}>
                    <FormLabel>رمز عبور جدید</FormLabel>
                    <InputGroup>
                      <Input
                        name="newPassword"
                        id="newpassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        px="16px"
                        pr={4}
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                      />
                      <InputLeftElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? (
                            <Icon as={FaEye} />
                          ) : (
                            <Icon as={FaEyeSlash} />
                          )}
                        </Button>
                      </InputLeftElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    bg={"cyan.400"}
                    color={"white"}
                    _hover={{
                      bg: "cyan.500",
                    }}
                    type="submit"
                    isDisabled={loadingResetPassword}
                  >
                    {loadingResetPassword ? (
                      <Loading emColor="gray.200" color="blue.500" size="lg" />
                    ) : (
                      "تغییر رمز عبور"
                    )}
                  </Button>
                </Flex>
              </form>
            )}
            {error && (
              <Alert status="error" dir="rtl" mt={5} fontSize="14.5px">
                <AlertIcon />
                مشکلی بوجود آمده است!
              </Alert>
            )}

            {!isEmailAvailable && (
              <Alert status="error" dir="rtl" mt={5} fontSize="14.5px">
                <AlertIcon />
                ایمیل یافت نشد
              </Alert>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ResetPassword;
