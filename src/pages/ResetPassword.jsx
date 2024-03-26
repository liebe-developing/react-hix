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
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice";
import { UserAuth } from "../api";

const moveUpAndDown = keyframes`  
from {transform: translateY(0);}   
to {transform: translateY(-60px)} 
`;
const ResetPassword = () => {
  const [error, setError] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  // const toast = useToast();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleResetPassowrd = (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      UserAuth("/api/auth/reset_password", email).then(function (res) {
        console.log(res);
        if (res.status === 404) {
          setIsEmailAvailable(false);
          return;
        } else if (res.status === 500) {
          setError(true);
          return;
        }
        dispatch(signInSuccess(res.data));
      });
      setLoading(false);
      // navigate("/sign-in");
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
              بازیابی رمز عبور
            </Heading>
            <form onSubmit={handleResetPassowrd}>
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
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    ) : (
                      "بازیابی"
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
