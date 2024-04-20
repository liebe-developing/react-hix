import { Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex w-full flex-row-reverse items-center justify-between py-4 mt-4 bg-red-50">
      <div className="flex items-center justify-center">
        <a href="https://portal.hixdm.com/">
          <Text>تمامی حقوق محفوظ است.</Text>
        </a>
        <a href="https://portal.hixdm.com/">
          <img className="inline" src="/logo_hix.svg" alt="" width={50} />
        </a>
      </div>

      <div className="">
        <Link
          to="/termofservices"
          className="text-gray-800 underline underline-offset-4 decoration-blue-700"
        >
          قوانین
        </Link>
        <Link
          to="/"
          className="text-gray-800 mx-3 underline underline-offset-4 decoration-blue-700"
        >
          صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
