import {
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, PrimaryButton } from "../components";
import { MdArrowDropDown } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import {
  apiGetRequest,
  apiPostRequest,
  apiPutRequest,
} from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { encode } from "base64-arraybuffer";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [loadingOpEmails, setLoadingOpEmails] = useState(false);
  const [operatorEmailField, setOperatorEmailField] = useState({
    name: "",
    opId: "",
  });

  const [operators, setOperators] = useState([]);

  const [formData, setFormData] = useState({
    widgetTitle: "",
    widgetDescription: "",
    welcomeMessage: "",
    storeDescription: "",
    widgetPosition: "1",
    widgetColor: "",
    iconUrl: "",
    selectedWidgetFile: null,
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const fileInput = useRef(null);
  const { userToken, userContent } = useOutletContext();
  const toast = useToast();

  useEffect(() => {
    apiGetRequest(`api/settings/${userContent.user_plan_id}`, userToken).then(
      (res) => {
        console.log(res.data.data.pos);
        setFormData({
          widgetTitle: res.data.data.title,
          widgetDescription: res.data.data.caption,
          welcomeMessage: res.data.data.welcome,
          storeDescription: res.data.data.description,
          widgetPosition: res.data.data.pos,
          widgetColor: res.data.data.color,
          iconUrl: res.data.data.icon,
        });
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileSelectedHandler = async (e) => {
    const reader = new FileReader();
    const waitForFilePromise = new Promise((resolve) => {
      reader.onload = async (e) => {
        const text = e.target.result;
        resolve(encode(text));
      };
    });
    reader.readAsArrayBuffer(e.target.files[0]);
    const imageBase64 = await waitForFilePromise;
    console.log(imageBase64);
    setFormData({
      ...formData,
      selectedWidgetFile: { name: e.target.files[0].name, data: imageBase64 },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    console.log(formData.widgetColor);

    const updatedBody = {
      color: formData.widgetColor,
      title: formData.widgetTitle,
      caption: formData.widgetDescription,
      pos: formData.widgetPosition,
      icon:
        formData.selectedWidgetFile &&
        formData.selectedWidgetFile.name &&
        formData.selectedWidgetFile.data
          ? formData.selectedWidgetFile
          : formData.iconUrl,
      welcome: formData.welcomeMessage,
      explain: formData.storeDescription,
      user_plan_id: userContent.user_plan_id,
    };
    console.log(updatedBody);
    apiPutRequest("api/settings", userToken, updatedBody)
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: `تایید شد!`,
            status: "success",
            position: "bottom",
            isClosable: false,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    console.log(formData.widgetPosition);
  };

  const handleCollectingOperatorEmail = () => {
    let re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!operatorEmailField) {
      toast({
        title: `ابتدا ایمیل وارد کنید`,
        status: "error",
        position: "top-right",
      });
      return;
    }

    if (
      operators.length >=
      userContent.plan.operator_count + userContent.plan.gift_operator_count
    ) {
      toast({
        title: `شما حداکثر مجاز به اضافه کردن ${
          userContent.plan.operator_count + userContent.plan.gift_operator_count
        } تعداد اپراتور هستید.`,
        status: "error",
        position: "top-right",
      });
    } else if (re.test(operatorEmailField.name)) {
      operatorEmailField.opId = crypto.randomUUID();

      setOperators((prevState) => [...prevState, operatorEmailField]);
      setOperatorEmailField({ name: "" });
    } else {
      toast({
        title: `لطفا ایمیل با فرمت صحیح وارد کنید`,
        status: "error",
        position: "top-right",
      });
    }
  };

  const handleRemoveOperatorEmail = (opId) => {
    const newEmails = operators.filter((operator) => operator.opId !== opId);
    setOperators(newEmails);
  };

  const handleSavingOperatorEmail = () => {
    setLoadingOpEmails(true);

    apiPostRequest("/api/auth/login", undefined, formData)
      .then((res) => {
        console.log(res);

        setLoadingOpEmails(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingOpEmails(false);
      });

    setTimeout(() => {
      setLoadingOpEmails(false);
    }, 3000);
  };

  return (
    <Box m={5}>
      <Flex alignItems="center" justifyContent="space-between" gap={3}>
        <Box>
          <Heading
            fontSize={{ base: "22px", md: "28px" }}
            borderRadius="10px"
            w="fit-content"
            fontFamily="Casablanca"
            mt={5}
          >
            تنظیمات
          </Heading>
          <Text
            color={useColorModeValue("#000", "gray.100")}
            opacity={0.5}
            fontSize={{ base: "10px", md: "20px" }}
          >
            تنظیمات حساب خود را مدیریت کنید
          </Text>
        </Box>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="purple"
          onClick={onOpen}
          shadow="lg"
          maxW="fit-content"
          size={{ base: "xs", md: "md" }}
        >
          اضافه کردن اپراتور
        </Button>
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
            w={{ base: "100%", md: "50%", lg: "30%" }}
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
              <Flex
                alignItems="center"
                flexWrap={"wrap"}
                gap={{ base: "2", md: "5" }}
                mb={{ base: "0", md: "2" }}
              >
                <Button
                  size={100}
                  padding={2}
                  variant="solid"
                  colorScheme="purple"
                  onClick={() => fileInput.current.click()}
                >
                  انتخاب فایل
                </Button>
                <Badge fontSize="13px" colorScheme="red">
                  {formData.selectedWidgetFile?.name}
                </Badge>
                {formData.iconUrl && (
                  <img
                    src={formData.iconUrl}
                    style={{
                      border: "1px solid yellow",
                      boxShadow: "6px 6px 12px #bebebe ,-6px -6px 12px #ffffff",
                    }}
                    className="rounded-full w-10 h-10 md:w-20 md:h-20 shadow-2xl "
                  />
                )}
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
          title={
            loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="orange.200"
                color="orange.500"
                size="lg"
              />
            ) : (
              "ذخیره تغییرات"
            )
          }
          type="submit"
          isDisabled={formData.selectedWidgetFile?.size > 1000000}
        />
      </form>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size="md"
        isCentered
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent mx={4} rounded="xl">
          <ModalHeader textAlign="left">اپراتور جدید</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" position="relative">
              <Field
                placeholder="ایمیل  اپراتور"
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                value={operatorEmailField.name}
                type="email"
                name={"operatorEmailField"}
                onChange={(e) =>
                  setOperatorEmailField({ name: e.target.value })
                }
              />
              <IconButton
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
                colorScheme="purple"
                icon={<FaPlus />}
                onClick={handleCollectingOperatorEmail}
              />
            </Flex>
            <Flex
              alignItems="center"
              flexDir="row"
              gap={3}
              flexWrap="wrap"
              w="full"
              mt={6}
            >
              {operators &&
                operators.map((operator) => (
                  <Badge
                    key={operator.opId}
                    variant="solid"
                    colorScheme="teal"
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    py={1}
                  >
                    {operator.name}
                    <Icon
                      onClick={() => handleRemoveOperatorEmail(operator.opId)}
                      _hover={{ color: "red.100" }}
                      cursor="pointer"
                      boxSize={4}
                      as={IoCloseCircle}
                    />
                  </Badge>
                ))}
            </Flex>
            {operators.length > 0 && (
              <Button
                mt={10}
                w="full"
                mb={4}
                colorScheme="purple"
                onClick={handleSavingOperatorEmail}
              >
                {loadingOpEmails ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="purple.200"
                    color="purple.400"
                    size="lg"
                  />
                ) : (
                  "ثبت"
                )}
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Settings;
