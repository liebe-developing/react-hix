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
} from "@chakra-ui/react";
import * as persianTools from "@persian-tools/persian-tools";

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

  console.log(location.state.invoiceId);
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
    if (!checked) {
      toast({
        title: ` لطفا شرایط را بپذیرد!`,
        status: "warning",
        position: "bottom",
        isClosable: false,
      });
      return;
    }

    toast({
      title: `درحال انتقال به درگاه پرداخت!`,
      status: "success",
      position: "top-right",
      isClosable: false,
    });
    apiPostRequest("api/invoice/pay", userToken, {
      id: location.state.invoiceId,
      discountCode:
        discountChecked && acceptedPercent && discount.trim().length > 0
          ? discount
          : undefined,
      FormData,
    })
      .then((res) => {
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
