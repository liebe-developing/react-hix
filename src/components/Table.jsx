/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useColorMode, useDisclosure } from "@chakra-ui/react";
import { MdOutlineRemoveDone } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ProductModal from "./product/ProductModal";

const Table = ({ tableData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const colorMode = useColorMode(); 
 

  const createData = (item) => {
    const { id, title, brand, description, image, price, status,url } =
      item;
    return (
      <tr
        key={id}
        bg={colorMode === "light" ? "gray.300" : "gray.700"}
        className="border-b cursor-pointer hover:bg-gray-100"
        onClick={onOpen}
      >
        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">
          {id}
        </td>
        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">
          {title}
        </td>
        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">
          {status === true ? <IoCheckmarkDoneSharp className="bg-gray-50 rounded-full text-blue-600  text-2xl inline" /> : <MdOutlineRemoveDone className="bg-white rounded-full text-black  text-2xl inline" />}
        </td>
        <td  className="text-center py-4 whitespace-nowrap text-sm font-medium ">
          <a href={url} className="text-blue-500">
            لینک
          </a>
        </td>
      </tr>
    );
  }
  return (
          <>
        <tbody className="border-2">
          {tableData && createData(tableData)}
        </tbody>
        <ProductModal isOpen={isOpen} onClose={onClose} dataContentModal={tableData} />
        </>
  );
};

export default Table;
