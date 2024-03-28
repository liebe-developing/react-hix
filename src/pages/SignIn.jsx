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
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice";
import { apiPostRequest } from "../api/apiRequest";

const moveUpAndDown = keyframes`  
from {transform: translateY(0);}   
to {transform: translateY(-60px)} 
`;
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginUser = (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      apiPostRequest("/api/auth/login", formData).then(function (res) {
        console.log(res);
        if (res.status === 401 || res.status === 400) {
          setError(true);
          return;
        }
        dispatch(signInSuccess(res.data));
        setLoading(false);
        navigate("/");
      });
    } catch (error) {
      setLoading(false);
      setError(true);
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
              ورود به حساب کاربری
            </Heading>
            <form onSubmit={handleLoginUser}>
              <Flex flexDir="column" gap={4} dir="rtl">
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
                <Stack spacing={10}>
                  <Stack
                    direction={"row"}
                    align={"start"}
                    mt={2}
                    justify={"space-between"}
                    fontSize={"14px"}
                  >
                    <Link to="/reset-password">
                      <Text color={"blue.400"}>فراموشی رمز عبور</Text>
                    </Link>
                    <Link to="/sign-up">
                      <Text color={"blue.400"}>ثبت نام</Text>
                    </Link>
                  </Stack>
                  <Button
                    bg={"cyan.400"}
                    color={"white"}
                    _hover={{
                      bg: "cyan.500",
                    }}
                    type="submit"
                    isDisabled={loading}
                  >
                    {loading ? "در حال ورود" : "ورود"}
                  </Button>
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

export default SignIn;
