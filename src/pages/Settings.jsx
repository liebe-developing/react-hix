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
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Loading, PageTitle, PrimaryButton } from "../components";
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
    const urlReader = new FileReader();
    const waitForFilePromise1 = new Promise((resolve) => {
      reader.onload = async (e) => {
        const text = e.target.result;
        resolve(encode(text));
      };
    });
    const waitForFilePromise2 = new Promise((resolve) => {
      urlReader.onload = async (e) => {
        const result = e.target.result;
        resolve(result);
      };
    });
    reader.readAsArrayBuffer(e.target.files[0]);
    urlReader.readAsDataURL(e.target.files[0]);
    const imageBase64 = await waitForFilePromise1;
    const imageDataUrl = await waitForFilePromise2;
    setFormData({
      ...formData,
      selectedWidgetFile: {
      selectedWidgetFile: {
        name: e.target.files[0].name,
        dataUrl: imageDataUrl,
        data: imageBase64,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

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

    if (re.test(operatorEmailField.name)) {
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

    apiPostRequest(
      `/api/user_plan/${userContent.user_plan_id}/operator`,
      userToken,
      {
        op_emails: operators.map((o) => o.name),
      }
    )
      .then((res) => {
        console.log(res);
        if (res.response.status === 400) {
          toast({
            title: `شما حداکثر مجاز به اضافه کردن ${userContent.plan.operator_count +
              userContent.plan.gift_operator_count
              } تعداد اپراتور هستید.`,
            status: "error",
            position: "top-right",
          });
        } /* else if (res.response.status === 500) {
          toast({
            title:
              res.response.data.code == 1
                ? "لطفا ابتدا ایمیل های مورد نظر را وارد کنید!"
                : res.response.data.code == 2
                ? "ایمیل های وارد شده اشتباه می باشد.لطفا بررسی کنید!"
                : "مشکلی پیش آمده است!",
            status: "error",
            position: "top-right",
          });
        }  */ else {
          toast({
            title: `اپراتور ها با موفقعیت اضاف شدند !`,
            status: "success",
            position: "top-right",
          });
          setLoadingOpEmails(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingOpEmails(false);
      })
      .finally(() => {
        onClose();
        setOperators([]);
      });

    setTimeout(() => {
      setLoadingOpEmails(false);
    }, 3000);
  };

  console.log(operators);

  return (
    <Box m={5}>
      <PageTitle title="تنظیمات | دستیار هوشمند هیکس" />
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
            label="عنوان بالای ویجت"
            placeholder="پشتیبانی سایت"
            onChange={handleChange}
            value={formData.widgetTitle}
            name="widgetTitle"
          />
          <Field
            label="توضیح بالای  ویجت"
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
            label="توضیحات فروشگاه "
            placeholder="لطفا توضیحات مرتبط با کسب و محصولات خود را وارد نمایید!"
            value={formData.storeDescription}
            name="storeDescription"
          />
          <FormControl>
            <FormLabel fontSize="14px">موقعیت نمایش ویجت</FormLabel>
            <Select
              onChange={(e) => {
                if (userContent.plan.price === 0) {
                  toast({
                    title: "این قابلیت در بسته رایگان غیر فعال میباشد!",
                    status: "error"
                  })
                  return;
                }
                handleChange(e)
              }}
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
            label="رنگ ویجت"
            type="color"
            w={{ base: "100%", md: "50%", lg: "30%" }}
            onClick={(e) => {
              if (userContent.plan.price === 0) {
                toast({
                  title: "این قابلیت در بسته رایگان غیر فعال میباشد!",
                  status: "error"
                })
                e.preventDefault();
                return;
              }
            }}
            onChange={handleChange}
            value={formData.widgetColor}
            name="widgetColor"
          />
          <Flex flexDir="column">
            <Field
              label="آیکون ویجت"
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
                  padding={{ base: 1, md: 2 }}
                  fontSize={{ base: "14px", md: "18px" }}
                  variant="solid"
                  colorScheme="purple"
                  onClick={() => {
                    if (userContent.plan.price === 0) {
                      toast({
                        title: "این قابلیت در بسته رایگان غیر فعال میباشد!",
                        status: "error"
                      })
                      return;
                    }
                    fileInput.current.click()
                  }}
                >
                  انتخاب فایل
                </Button>
                <Badge fontSize="13px" colorScheme="red">
                  {formData.selectedWidgetFile?.name}
                </Badge>

                <img
                  src={
                    formData.selectedWidgetFile
                      ? formData.selectedWidgetFile.dataUrl
                      : formData.iconUrl
                  }
                  style={{
                    border: "1px solid yellow",
                    boxShadow: useColorModeValue(
                      "6px 6px 12px #bebebe ,-6px -6px 12px #ffffff",
                      "6px 6px 12px #464646 ,-6px -6px 12px #333"
                    ),
                  }}
                  className="rounded-full w-10 h-10 md:w-16 md:h-16 shadow-2xl "
                />
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
              <Loading emColor="orange.200" color="orange.500" size="lg" />
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
                  <Loading emColor="purple.200" color="purple.400" size="lg" />
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
