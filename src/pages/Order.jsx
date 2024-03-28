import { useRef } from "react";
import { useState } from "react";

function Order() {

  const [discount, setDiscount] = useState("")
  const [checked, setChecked] = useState(false)
  const btnDis = useRef()

  const sendShopping = (event) => {
    event.preventDefault();
    if (!checked) {
      alert('لطفاً قبول شرایط را تأیید کنید!');
      return;
    }
    console.log('سفارش ارسال شد');
  }

  const discountHandler = (event) => {
    event.preventDefault()
    if (discount < 4) {
      alert('کد اشتباه است')
    } else {
      console.log(discount);
      btnDis.current.classList.remove('bg-blue-500');
    }
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 h-auto">
      <div className="grid col-span-8">
        <form>

        </form>
      </div>
      <div className="flex flex-col items-center justify-center
     gap-3 col-span-4 border-r-2 border-gray-300">
        <img src='/avatar.webp' width={50} className="shadow-2xl rounded-full" />
        <h3 className="pm-10">مینا رضایی </h3>
        <h3 className="mt-3 underline underline-offset-8">نوع پلن اقتصادی</h3>
        <div>
          <h5 className="my-2 text-md">
            قیمت:
          </h5>
          <h3 className="text-xl font-bold text-blue-500">
            2,000,000 T
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
              2,000,000 T
            </h3>
            <h3 className="mt-6 flex items-center">
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
    </section>
  )
}

export default Order;
