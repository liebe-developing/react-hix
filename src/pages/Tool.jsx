import { useState } from "react"
import {
  ArrowDown,
  IoDocuments,
  MesIcon,
} from "../constants/icons"

function Tool() {

  const [copytext, setCopytext] = useState(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. A magnam exercitationem vel modi molestias neque provident eius mollitia quisquam delectus. Quibusdam natus eaque iusto ab sint expedita dolorem? Itaque, voluptates!")

  const copyHandler = ()=>{
    navigator.clipboard.writeText(copytext);
  }

  return (
    <div className="">
      <h2 className="text-primary">نصب ابزارک</h2>

      {/* < contentCopy > */}
      <div className="w-full my-9 py-9 px-4 text-white bg-gray-400 rounded-md relative">
        <span className="absolute right-3 p-2 -top-6 bg-blue-400 rounded-sm shadow-md ">
          <ArrowDown className="text-3xl text-white" />
        </span>
        <h3 >برای نمایش ابزارک گفتگو در سایت خود، کد زیر را در قالب سایت درج کنید:</h3>
        <button
        onClick={copyHandler}
        className="w-[90]  py-5 border-l-4 border border-l-red-500 rounded-lg border-gray-500 
        my-6">
          {copytext}
        </button>
      </div>
      {/* </ contentCopy > */}


      {/* < bottom content about > */}
      <div className="flex flex-col md:flex-row mt-20">
        {/* LEFT */}
        <div className="relative  py-10 px-4">
          <span className="absolute right-3 p-2 -top-6 bg-blue-400 rounded-sm shadow-md">
            <IoDocuments className="text-3xl text-white" />
          </span>
          <h2 className="text-primary mb-4">
            مستندات سامانه
          </h2>
          <h4>
            توسعه دهندگان می توانند برای ایجاد تعامل بیشتر هیکس با سایت خود، از مستندات ابزارک و نیزمستندات API استفاده کنند.
          </h4>
        </div>
        {/* RGIHT */}
        <div className="relative py-10 px-4">
          <span className="absolute right-3 p-2 -top-6 bg-blue-400 rounded-sm shadow-md">
            <MesIcon className="text-3xl text-white" />
          </span>
          <h2 className="text-primary mb-4">
            صفحه اختصاصی گفتگو
          </h2>
          <h4>
            توسعه دهندگان می توانند برای ایجاد تعامل بیشتر هیکس با سایت خود، از مستندات ابزارک و نیزمستندات API استفاده کنند.
          </h4>
        </div>
      </div>
      {/* </ bottom content about > */}
    </div>
  )
}

export default Tool
