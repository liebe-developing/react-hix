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
} from "@chakra-ui/react";
import * as persianTools from "@persian-tools/persian-tools";
import Field from "../components/Field";
import isValidURL from "../services/ErrorHandling/validate ";

function Order() {
  const toast = useToast();
  const { userToken } = useOutletContext();
  const location = useLocation();
  // console.log(location.state.invoiceId);
  const [discount, setDiscount] = useState("");
  const [checked, setChecked] = useState(false);
  const [discountChecked, setDiscountChecked] = useState(false);
  const [dataApiInvoiceSetUi, setDataApiInvoiceSetUi] = useState();
  const [acceptedPercent, setAcceptedPercent] = useState();
  const btnDis = useRef();
  const [formData,setFormData] = useState({
    businessUrl : "",
    productCountLimit: "L500",
    categoryCountLimit: "L20"
  })
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const sendShopping = (event) => {
    event.preventDefault();
    if (!isValidURL(formData.businessUrl.trim())){
      toast({
        title: ` لطفا آدرس وبسایت وارد نمایید!`,
        status: "warning",
        position: "bottom",
        isClosable: false,
      });
      return;
    } 

    if (!checked) {
      toast({
        title: ` لطفا شرایط را بپذیرد!`,
        status: "warning",
        position: "bottom",
        isClosable: false,
      });
      return;
    }

    apiPostRequest("api/invoice/pay", userToken, {
      id: location.state.invoiceId,
      businessUrl: formData.businessUrl.trim(),
      productCountLimit: formData.productCountLimit,
      categoryCountLimit: formData.categoryCountLimit,
      discountCode:
        discountChecked && acceptedPercent && discount.trim().length > 0
          ? discount
          : undefined,
      FormData,
    })
      .then((res) => {
        toast({
          title: res.data.free ? `پرداخت موفق! در حال بروزرسانی!` : `درحال انتقال به درگاه پرداخت!`,
          status: "success",
          position: "top-right",
          isClosable: false,
        });

        window.location.href = res.data.paymentUrl;
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  const discountHandler = (event) => {
    event.preventDefault();
    apiPostRequest("api/discount", userToken, { discountCode: discount })
      .then((res) => {
        setDiscountChecked(false);
        if (res.status === 200) {
          btnDis.current.classList.add("bg-white");
          btnDis.current.disabled = true;
          toast({
            title: `تایید شد!`,
            status: "success",
            position: "bottom",
            isClosable: true,
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
            isClosable: true,
          });
        }
      })
      .catch((erorr) => {
        console.log(erorr);
      });
  };

  

  const discountPrice =
    (dataApiInvoiceSetUi?.plan?.price * (100 - acceptedPercent)) / 100;
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
              <Flex justifyContent="space-between" alignItems="center" my={8}>
                <h5 className="my-2 text-lg">قیمت:</h5>
                <h3 className="text-lg text-gray-600">
                  {persianTools.digitsEnToFa(
                    persianTools.addCommas(dataApiInvoiceSetUi.plan.price)
                  )}{" "}
                  ریال
                </h3>
                <Text
                  opacity=".5"
                  textDecoration="line-through"
                  fontSize="13px"
                >
                  {persianTools.digitsEnToFa(
                    persianTools.addCommas(dataApiInvoiceSetUi.plan.oldPrice)
                  )}{" "}
                  ریال
                </Text>
              </Flex>
              {/* <h5 className="my-5">کد تخفیف :</h5> */}
              <form>
                <label htmlFor="businessUrl">آدرس وبسایت:</label>
                <Field value={formData.businessUrl} placeholder="https://example.com" style={{border: "1px solid gray"}} id="businessUrl" name="businessUrl" onChange={handleChange} />
                <label htmlFor="productCountLimit" className="mb-2 inline-block">تعداد محصولات:</label>
                <Select name="productCountLimit" onChange={handleChange}
                  value={formData.productCountLimit} style={{ paddingRight: '30px', cursor: 'pointer', border: "1px solid gray" }}  id="productCountLimit">
                  <option value='L500'>کمتر از 500 عدد</option>
                  <option value='L1000'>کمتر از 1000 عدد</option>
                  <option value='L2000'>کمتر از 2000 عدد</option>
                  <option value='L3000'>کمتر از 3000 عدد</option>
                  <option value='L5000'>کمتر از 5000 عدد</option>
                  <option value='M5000'>بیشتر از 5000 عدد</option>
                </Select>
                {/* CONTENT SECTION 2 */}
                <label htmlFor="categoryCountLimit" className="my-2 inline-block" >تعداد دسته ها:</label>
                <Select name="categoryCountLimit" onChange={handleChange} value={formData.categoryCountLimit} style={{ paddingRight: '30px', cursor: 'pointer', border: "1px solid gray" }} id="categoryCountLimit">
                  <option value='L20'>کمتر از 20 عدد</option>
                  <option value='L50'>کمتر از 50 عدد</option>
                  <option value='L100'>کمتر از 100 عدد</option>
                  <option value='M100'>بیشتر از 100 عدد</option>
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
                    onClick={discountHandler}
                    // className="py-1 px-2 bg-blue-500 rounded text-black hover:scale-105"
                  >
                    ثبت
                  </Button>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center" my={8}>
                  <h5 className="text-md mt-5 mb-2">قیمت نهایی:</h5>
                  <h3 className="text-lg font-bold text-gray-600 border-orange-500">
                    {acceptedPercent
                      ? persianTools.digitsEnToFa(
                          persianTools.addCommas(discountPrice)
                        )
                      : persianTools.digitsEnToFa(
                          persianTools.addCommas(dataApiInvoiceSetUi.plan.price)
                        )}{" "}
                    ریال
                  </h3>
                </Flex>
                <h3 className="mt-10 flex dataApiInvoiceSetUis-center items-center gap-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="me-1 w-4 h-4 "
                  />
                  <label>شرایط را میپزیرم!</label>
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
                  ثبت سفارش
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
