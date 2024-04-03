import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { apiGetRequest, apiPostRequest } from "../api/apiRequest";
import {
  useToast,
} from "@chakra-ui/react";
function Order() {
  const toast = useToast()
  const { userToken } = useOutletContext();
  const location = useLocation();
  // console.log(location.state.invoiceId);
  const [discount, setDiscount] = useState("")
  const [checked, setChecked] = useState(false)
  const [discountChecked, setDiscountChecked] = useState(false)
  const [dataApiInvoiceSetUi, setDataApiInvoiceSetUi] = useState()
  const [acceptedPercent, setAcceptedPercent] = useState()
  const btnDis = useRef()


  console.log(location.state.invoiceId);
  useEffect(() => {
    apiGetRequest(`api/invoice/${location.state.invoiceId}`, userToken).then(res => {
      setDataApiInvoiceSetUi(res.data.data)
    }).catch(error => {
      console.log(error)
    })

  }, [discountChecked])

  const sendShopping = (event) => {
    event.preventDefault();
    if (!checked) {
      toast({
        title: ` لطفا شرایط را بپذیرد!`,
        status: "warning",
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    toast({
      title: `تایید شد`,
      status: "success",
      position: "top-right",
      isClosable: true,
    });
    apiPostRequest("api/invoice/pay", userToken, {
      id: location.state.invoiceId,
      discountCode: discountChecked && acceptedPercent && discount.trim().length > 0 ? discount : undefined
    }).then(res => {
      window.location.href = res.data.paymentUrl
    }).catch(error => {
      console.log(error);
    })
  }

  const discountHandler = (event) => {
    event.preventDefault()
    apiPostRequest("api/discount", userToken, { discountCode: discount }).then(res => {
      setDiscountChecked(false)
      if (res.status === 200) {
        btnDis.current.classList.add("bg-white");
        btnDis.current.disabled = true
        toast({
          title: `تایید شد!`,
          status: "success",
          position: "bottom",
          isClosable: true,
        });
        setAcceptedPercent(res.data.percent)

        console.log(res.data.percent);
        setDiscountChecked(true)
      }
    }).catch(erorr => {
      console.log(erorr)
    })
  }

  return (
    <section className="flex items-center justify-center h-auto">

      {
        dataApiInvoiceSetUi &&
        <><div className="flex flex-col justify-center items-center dataApiInvoiceSetUis-center 
                                gap-3 col-span-8 ">
          <img src='/avatar.webp' width={50} className="shadow-2xl rounded-full" />
          <h3 className="pm-10">{dataApiInvoiceSetUi.plan.title.trim()}</h3>
          <h3 className="mt-3 underline underline-offset-8">
            {dataApiInvoiceSetUi.plan.days / 30} ماهه
          </h3>
          <div>
            <h5 className="my-2 text-md">
              قیمت:
            </h5>
            <h3 className="text-xl font-bold text-blue-500">
              {dataApiInvoiceSetUi.plan.price}
            </h3>
            <h5 className="my-5">
              کد تخفیف :
            </h5>
            <form>
              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                type="text" className=" rounded-lg border-4" />
              <span className="mx-3">
                <button
                  ref={btnDis}
                  onClick={discountHandler}
                  className="py-1 px-2 bg-blue-500 rounded text-black hover:scale-105">
                  ثبت
                </button>
              </span>
              <h5 className="text-md my-5">
                قیمت نهایی:
              </h5>
              <h3 className="text-xl font-bold text-blue-500 underline underline-offset-8 border-orange-500">
                {
                  acceptedPercent ? dataApiInvoiceSetUi.plan.price * (100 - acceptedPercent) / 100 : dataApiInvoiceSetUi.plan.price
                } ریال
              </h3>
              <h3 className="mt-6 flex dataApiInvoiceSetUis-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="me-1 w-4 h-4 "
                />
                <label>شرایط می‌پذیرد!</label>
              </h3>
              <button
                type="submit"
                onClick={sendShopping}
                className="mt-10 bg-rose-600
                hover:bg-rose-500 text-white rounded-md py-1 px-9 mr-10">ثبت سفارش</button>
            </form>
          </div>
        </div>

        </>
      }
    </section>
  )
}

export default Order;
