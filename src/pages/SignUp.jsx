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
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../services/Axios/Requests";

const moveUpAndDown = keyframes`  
from {transform: translateY(0);}   
to {transform: translateY(-60px)} 
`;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { name, email, mobile, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
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

      UserAuth("/api/auth/register", formData).then(function (res) {
        if (res.status === 500 || res.status === 400) {
          setError(true);
          return;
        }
      });
      toast({
        title: `پروفایل شما با موفقیت ساخته شد`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
      toast({
        title: `مشکلی پیش آمده است`,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const spinAnimation = `${moveUpAndDown} infinite 2s linear alternate`;
  return (
    <Box position={"relative"} dir="ltr">
      <Flex
        as={Flex}
        flexDir={{ base: "column-reverse", md: "row" }}
        spacing={{ base: 10, lg: 10 }}
        minH={"100vh"}
        bgImage="login-register-bg.webp"
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
              ایجاد حساب کاربری
            </Heading>
            <form onSubmit={handleRegisterUser}>
              <Flex flexDir="column" gap={4} spacing={4} dir="rtl">
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
                    {loading ? "ثبت نام..." : "ثبت نام"}
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
