/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useColorMode, useDisclosure } from "@chakra-ui/react";
import { Iconcheck } from "../constants/icons";
import ProductModal from "./product/ProductModal";

const Table = ({ tableData, currentPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  console.log(currentPage);
  const colorMode = useColorMode(); 
  console.log(tableData);

  const createData = (item) => {
    const { id, title, brand, description, image, price, status, onClick } =
      item;
    return (
      <tr
        key={item.id}
        bg={colorMode === "light" ? "gray.300" : "gray.700"}
        className="border-b cursor-pointer hover:bg-gray-100"
        onClick={onOpen}
      >
        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">
          {item.id}
        </td>
        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">
          {item.title}
        </td>
        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">
          {item.status === true ? <Iconcheck className="bg-white text-blue-600  text-2xl inline" /> : 'نبود'}
        </td>
        <td  className="text-center py-4 whitespace-nowrap text-sm font-medium ">
          <a href={item.url} className="text-blue-500">
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
