import { useEffect, useState } from "react";
import { ArrowDown, IoDocuments, MesIcon } from "../constants/icons";
import { apiGetRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";
import { CopyBlock, dracula } from "react-code-blocks";
import { useColorModeValue } from "@chakra-ui/react";
import { PageTitle } from "../components";

function Tool() {
  const { userToken, userContent } = useOutletContext();
  const [copytext, setCopyText] = useState("");

  useEffect(() => {
    apiGetRequest(
      `api/settings/script/${userContent.user_plan_id}`,
      userToken
    ).then((res) => {
      setCopyText(res.data.data);
    });
  }, []);

  return (
    <div className="m-5">
      <PageTitle title="راه‌اندازی | دستیار هوشمند هیکس" />
      <h2 className="text-primary">نصب ابزارک</h2>

      {/* < contentCopy > */}
      <div
        className={`w-full my-9 py-9 px-4 text-white rounded-md relative ${useColorModeValue(
          "bg-gray-400",
          "bg-gray-700"
        )}`}
      >
        <span className="absolute right-3 p-2 -top-6 bg-blue-400 rounded-sm shadow-md ">
          <ArrowDown className="text-3xl text-white" />
        </span>
        <h3>
          برای نمایش ویحت گفتگو در سایت خود، کد زیر را در قالب سایت درج کنید:
        </h3>
        {/* <button
        dir="ltr"
        onClick={copyHandler}
          className="w-[90] bg-black  py-5 border-l-4 border border-l-red-500 rounded-lg border-gray-500 
        my-6 text-start ps-4 ">
          {copytext}
        </button> */}
        <div className="mt-5" dir="ltr">
          <CopyBlock
            text={copytext}
            language="html"
            showLineNumbers={true}
            theme={dracula}
            wrapLines
            codeBlock
          />
        </div>
      </div>
      {/* </ contentCopy > */}

      {/* < bottom content about > */}
      <div className="flex flex-col md:justify-between md:flex-row mt-20">
        {/* LEFT */}
        <div className="relative  py-10 px-4">
          <span className="absolute right-3 p-2 -top-6 bg-blue-400 rounded-sm shadow-md">
            <IoDocuments className="text-3xl text-white" />
          </span>
          <h2 className="text-primary mb-4">مستندات سامانه</h2>
          <h4>سامانه در حال بروزرسانی است!</h4>
        </div>
        {/* RGIHT */}
        <div className="relative py-10 px-4">
          <span className="absolute right-3 p-2 -top-6 bg-blue-400 rounded-sm shadow-md">
            <MesIcon className="text-3xl text-white" />
          </span>
          <h2 className="text-primary mb-4">صفحه اختصاصی هیکس</h2>
          <h4>
            توسعه دهندگان می توانند برای ایجاد تعامل بیشتر هیکس با سایت خود، از
            مستندات ویجت و نیزمستندات API استفاده کنند.
          </h4>
        </div>
      </div>
      {/* </ bottom content about > */}
    </div>
  );
}

export default Tool;
