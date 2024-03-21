import { useRef } from "react";
import { useState } from "react";

function Order() {

  const [discount, setDiscount] = useState("")
  const btnDis = useRef()

  const sendeShoping = (event) => {
    event.preventDefault()
    console.log('mmad');
  }

  const discountHandler = (event) => {
    event.preventDefault()
    if(discount < 4){
      alert('رمز اشتباه است')
    }else {
      console.log(discount);
      btnDis.current.classList.remove('bg-blue-500');
    }
  }

  return (
    <section className="w-100 h-4/5 flex flex-col items-center justify-center gap-3">
      <img src='/avatar.webp' width={100} className="shadow-2xl rounded-full" />
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
        {/* < FOMRM > */}
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
            {/* {planPrice * discountPercent / 100} ریال */}
            2,000,000 T
          </h3>
          <button
            type="submit"
            onClick={sendeShoping}
            className="mt-10 bg-rose-600
          hover:bg-rose-500 text-white rounded-md py-3 px-20">ثبت سفارش</button>
        </form>
        {/* </ FOMRM > */}
      </div>
    </section>
  )
}

export default Order
