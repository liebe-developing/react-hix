import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { apiGetRequest, apiPostRequest } from "../api/apiRequest";
import {
  useToast,
  Avatar,
  Input,
  Button,
  Flex,
  Box,
  Text,
  Select,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import * as persianTools from "@persian-tools/persian-tools";
import Field from "../components/Field";
import isValidURL from "../services/ErrorHandling/validate ";

function Order() {
  const toast = useToast();
  const { userToken } = useOutletContext();
  const location = useLocation();
  // console.log(location.state.invoiceId);
  const [loadingDiscount, setLoadingDiscount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState("");
  const [checked, setChecked] = useState(false);
  const [discountChecked, setDiscountChecked] = useState(false);
  const [dataApiInvoiceSetUi, setDataApiInvoiceSetUi] = useState();
  const [acceptedPercent, setAcceptedPercent] = useState();
  const btnDis = useRef();
  const [formData, setFormData] = useState({
    businessUrl: "",
    productCountLimit: "L500",
    categoryCountLimit: "L20",
    useScrapper: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(name + "=" + value);
  };

  useEffect(() => {
    apiGetRequest(`api/invoice/${location.state.invoiceId}`, userToken)
      .then((res) => {
        setDataApiInvoiceSetUi(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [discountChecked]);

  const discountHandler = (event) => {
    event.preventDefault();
    setLoadingDiscount(true);
    if (discount === "") {
      toast({
        title: `لطفا کد تخفیف خود را وارد کنید`,
        status: "warning",
        position: "bottom-left",
      });
      setLoadingDiscount(false);
    }
    apiPostRequest("api/discount", userToken, { discountCode: discount })
      .then((res) => {
        setDiscountChecked(false);

        if (res.status === 200) {
          btnDis.current.classList.add("bg-white");
          btnDis.current.disabled = true;
          toast({
            title: `کد تخفیف اعمال شد`,
            status: "success",
            position: "bottom",
          });
          setAcceptedPercent(res.data.percent);

          console.log(res.data.percent);
          setDiscountChecked(true);
        }
        if (res.status === 403) {
          toast({
            title: `تایید نشد!`,
            status: "success",
            position: "bottom",
          });
        }
        setLoadingDiscount(false);
      })
      .catch((erorr) => {
        setLoadingDiscount(false);
        console.log(erorr);
      });
  };

  const sendShopping = (event) => {
    event.preventDefault();
    if (formData.businessUrl === "") {
      toast({
        title: `لطفا آدرس وبسایت  را وارد نمایید!`,
        status: "warning",
        position: "bottom-left",
      });
      return;
    }
    if (!isValidURL(formData.businessUrl.trim())) {
      toast({
        title: `لطفا آدرس وبسایت  را  با فرمت صحیح وارد نمایید!`,
        status: "warning",
        position: "bottom-left",
      });
      return;
    }
    if (!checked) {
      toast({
        title: ` لطفا شرایط را بپذیرد!`,
        status: "warning",
        position: "bottom-left",
      });
      return;
    }

    setLoading(true);
    apiPostRequest("api/invoice/pay", userToken, {
      id: location.state.invoiceId,
      businessUrl: formData.businessUrl.trim(),
      productCountLimit: formData.productCountLimit,
      categoryCountLimit: formData.categoryCountLimit,
      useScrapper: formData.useScrapper,
      discountCode:
        discountChecked && acceptedPercent && discount.trim().length > 0
          ? discount
          : undefined,
      FormData,
    })
      .then((res) => {
        toast({
          title: res.data.free
            ? `پرداخت موفق! در حال بروزرسانی!`
            : `درحال انتقال به درگاه پرداخت!`,
          status: "success",
          position: "top-right",
          isClosable: false,
        });

        window.location.href = res.data.paymentUrl;
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const discountPrice =
    ((dataApiInvoiceSetUi?.plan?.price / 10) * (100 - acceptedPercent)) / 100;
  return (
    <section className="flex items-center justify-center h-auto my-10">
      {dataApiInvoiceSetUi && (
        <>
          <div
            className="flex flex-col justify-center items-center dataApiInvoiceSetUis-center 
            gap-3 col-span-8"
          >
            <Avatar
              src="/avatar.webp"
              width={50}
              className="shadow-2xl rounded-full"
            />
            <h3 className="pm-10">{dataApiInvoiceSetUi.plan.title.trim()}</h3>
            <h3 className="mt-3 underline underline-offset-8">
              {dataApiInvoiceSetUi.plan.days === 365
                ? "12 ماهه"
                : dataApiInvoiceSetUi.plan.days === 180
                ? "6 ماهه"
                : dataApiInvoiceSetUi.plan.days === 30
                ? "1 ماهه"
                : `${dataApiInvoiceSetUi.plan.days} روزه`}
            </h3>
            <Box>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                gap={2}
                my={8}
              >
                <h5 className="my-2 text-lg">قیمت:</h5>
                <h3 className="text-md text-gray-600 ">
                  {persianTools.digitsEnToFa(
                    persianTools.addCommas(dataApiInvoiceSetUi.plan.price / 10)
                  )}{" "}
                  تومان
                </h3>
                {dataApiInvoiceSetUi.plan.oldPrice !== 0 && (
                  <Text
                    textDecoration="line-through"
                    textDecorationThickness="2px"
                    textDecorationColor="#FC3205"
                    fontSize="18px"
                    className="font-extrabold "
                  >
                    {persianTools.digitsEnToFa(
                      persianTools.addCommas(
                        dataApiInvoiceSetUi.plan.oldPrice / 10
                      )
                    )}{" "}
                    تومان
                  </Text>
                )}
              </Flex>
              {/* <h5 className="my-5">کد تخفیف :</h5> */}
              <form>
                <label htmlFor="businessUrl">آدرس وبسایت:</label>
                <Field
                  value={formData.businessUrl}
                  placeholder="https://example.com"
                  style={{ border: "1px solid gray" }}
                  id="businessUrl"
                  name="businessUrl"
                  onChange={handleChange}
                />
                <br />
                <Checkbox
                  name="useScrapper"
                  value={formData.useScrapper}
                  onChange={() =>
                    setFormData((pState) => {
                      return {
                        ...pState,
                        useScrapper: !pState.useScrapper,
                      };
                    })
                  }
                >
                  Scrapper
                </Checkbox>
                <br />
                <br />
                <label
                  htmlFor="productCountLimit"
                  className="mb-2 inline-block"
                >
                  تعداد محصولات:
                </label>
                <Select
                  name="productCountLimit"
                  onChange={handleChange}
                  disabled={!formData.useScrapper}
                  value={formData.productCountLimit}
                  style={{
                    paddingRight: "30px",
                    cursor: "pointer",
                    border: "1px solid gray",
                  }}
                  id="productCountLimit"
                >
                  <option value="L500">کمتر از 500 محصول </option>
                  <option value="L1000">بین 500 تا 1000 محصول </option>
                  <option value="L2000">بین 1000 تا 2000 محصول </option>
                  <option value="L3000">بین 2000 تا 3000 محصول </option>
                  <option value="L5000">بین 3000 تا 4000 محصول </option>
                  <option value="M5000">بیشتر از 5000 محصول </option>
                </Select>
                {/* CONTENT SECTION 2 */}
                <label
                  htmlFor="categoryCountLimit"
                  className="my-2 inline-block"
                >
                  تعداد دسته بندی ها:
                </label>
                <Select
                  name="categoryCountLimit"
                  onChange={handleChange}
                  disabled={!formData.useScrapper}
                  value={formData.categoryCountLimit}
                  style={{
                    paddingRight: "30px",
                    cursor: "pointer",
                    border: "1px solid gray",
                  }}
                  id="categoryCountLimit"
                >
                  <option value="L20">کمتر از 20 دسته </option>
                  <option value="L50">بین 20 تا 50 دسته </option>
                  <option value="L100">بین 50 تا 100 دسته </option>
                  <option value="M100">بیشتر از 100 دسته </option>
                </Select>
              </form>
              <hr className="bg-black border-2 mt-5" />
              <form>
                <Flex gap={2} my={4}>
                  <Input
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    type="text"
                    placeholder="کد تخفیف"
                    border="1px solid gray"
                  />
                  <Button
                    ref={btnDis}
                    colorScheme="whatsapp"
                    w="75px"
                    onClick={discountHandler}
                    // className="py-1 px-2 bg-blue-500 rounded text-black hover:scale-105"
                  >
                    {loadingDiscount ? (
                      <Spinner
                        // size="md"
                        emptyColor="gray.200"
                        color="green.500"
                      />
                    ) : (
                      "ثبت"
                    )}
                  </Button>
                </Flex>
                <Flex
                  justifyContent="center"
                  gap="20px"
                  alignItems="center"
                  my={8}
                >
                  <h5 className="text-[20px] mt-5 mb-2">قیمت نهایی:</h5>
                  <h3 className="text-lg mt-2 font-bold text-gray-600 border-orange-500">
                    {acceptedPercent
                      ? persianTools.digitsEnToFa(
                          persianTools.addCommas(discountPrice)
                        )
                      : persianTools.digitsEnToFa(
                          persianTools.addCommas(
                            dataApiInvoiceSetUi.plan.price / 10
                          )
                        )}{" "}
                    <span className="mx-[2px]">تومان</span>
                  </h3>
                </Flex>
                <h3 className="mt-10 flex dataApiInvoiceSetUis-center items-center gap-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="me-1 w-4 h-4 "
                  />
                  <label>قوانین!</label>
                </h3>
                <Button
                  type="submit"
                  colorScheme="orange"
                  onClick={sendShopping}
                  w="full"
                  mt={8}
                  //   className="mt-10 bg-rose-600
                  // hover:bg-rose-500 text-white rounded-md py-1 px-9 mr-10"
                >
                  {loading ? (
                    <Spinner
                      // size="md"
                      emptyColor="orange.200"
                      color="orange.500"
                    />
                  ) : (
                    "ثبت سفارش"
                  )}
                </Button>
              </form>
            </Box>
          </div>
        </>
      )}
    </section>
  );
}

export default Order;
