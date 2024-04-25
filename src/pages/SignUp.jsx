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
  InputGroup,
  InputLeftElement,
  Icon,
  keyframes,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiPostRequest } from "../api/apiRequest";
import { useSelector } from "react-redux";
import { Loading } from "../components";

const moveUpAndDown = keyframes`  
from {transform: translateY(0);}   
to {transform: translateY(-60px)} 
`;

const SignUp = () => {
  const mobileInput = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    restpass: "",
    business_url: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { name, email, mobile, password, restpass, business_url } = formData;

  const userToken = useSelector((state) => state?.user?.currentUser?.token);

  useEffect(() => {
    userToken && navigate("/dashboard");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let priceNum = mobileInput.current.value;
    if (priceNum.length > 11) {
      return false;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      if (formData.password !== formData.restpass) {
        toast({
          title: `فیلد رمز باهم برابر نیست!`,
          status: "error",
          position: "top-right",
        });
        setLoading(false);
      } else if (
        formData.password.length < 4 ||
        formData.password.length > 16
      ) {
        toast({
          title: `رمز عبور باید بین 6 تا 16 کاراکتر باشد`,
          status: "error",
          position: "top-right",
        });
        setLoading(false);
        return;
      } else {
        apiPostRequest("/api/auth/register", undefined, formData)
          .then(() => {
            toast({
              title: `پروفایل شما با موفقیت ساخته شد`,
              status: "success",
              position: "top-right",
            });
            setLoading(false);
            navigate("/sign-in");
          })
          .catch(() => {
            setError(true);
            setLoading(false);

            setFormData((pState) => {
              return {
                ...pState,
                password: "",
                restpass: "",
              };
            });

            toast({
              title: `اطلاعات وارد شده صحیح نمی باشد.`,
              status: "error",
              position: "top-right",
              isClosable: true,
            });
          });
      }
    } catch (error) {
      setError(true);
      toast({
        title: `مشکلی پیش آمده است`,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const spinAnimation = `${moveUpAndDown} infinite 2s linear alternate`;

  return (
    <Box position={"relative"} dir="ltr" overflow={"hidden"}>
      <Flex
        flexDir={{ base: "column-reverse", md: "row" }}
        spacing={{ base: 10, lg: 10 }}
        minH={"100vh"}
        bgImage="/login-register-bg.webp"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
      >
        <Flex flex={1.2} m={{ base: 0, md: 10 }} animation={spinAnimation}>
          <Image
            maxW={{ base: "full", md: "720px" }}
            maxH={{ base: "auto", md: "615px" }}
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
              ایجاد حساب کاربری
            </Heading>
            <form onSubmit={handleRegisterUser}>
              <Flex flexDir="column" gap={4} dir="rtl">
                <FormControl id="name" isRequired>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <Input
                    px="16px"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="زهره رضایی"
                  />
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>ایمیل</FormLabel>
                  <Input
                    px="16px"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                  />
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>موبایل</FormLabel>
                  <Input
                    ref={mobileInput}
                    maxLength={11}
                    px="16px"
                    type="number"
                    name="mobile"
                    value={mobile}
                    onChange={handleChange}
                    placeholder="8257***0917"
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>رمز عبور</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      value={password}
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
                  <FormHelperText fontSize="12px">
                    حداقل 3 و حداکثر 16 کاراکتر مجاز است.
                  </FormHelperText>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>تکرار رمز عبور</FormLabel>
                  <InputGroup>
                    <Input
                      name="restpass"
                      value={restpass}
                      onChange={handleChange}
                      px="16px"
                      pr={4}
                      type={showRepeatPassword ? "text" : "password"}
                      placeholder="********"
                    />
                    <InputLeftElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowRepeatPassword(
                            (showRepeatPassword) => !showRepeatPassword
                          )
                        }
                      >
                        {showRepeatPassword ? (
                          <Icon as={FaEye} />
                        ) : (
                          <Icon as={FaEyeSlash} />
                        )}
                      </Button>
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="url" mt={4}>
                  <FormLabel> آدرس وبسایت (اختیاری) </FormLabel>
                  <Input
                    px="16px"
                    minLength={7}
                    type="text"
                    name="business_url"
                    value={business_url}
                    onChange={handleChange}
                    placeholder="https://www.example.ir"
                  />
                </FormControl>
                <Stack spacing={3} mt={6}>
                  <Button
                    bg={"cyan.400"}
                    color={"white"}
                    _hover={{
                      bg: "cyan.500",
                    }}
                    type="submit"
                  >
                    {loading ? (
                      <Loading emColor="gray.200" color="blue.500" size="lg" />
                    ) : (
                      "ثبت نام"
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
              </Flex>
            </form>
            {error && <Text>Error</Text>}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SignUp;
