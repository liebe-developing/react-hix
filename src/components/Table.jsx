/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import {
    useColorMode,
    useDisclosure,
    Icon,
    useColorModeValue,
    IconButton,
    Button,
    useToast,
} from "@chakra-ui/react";
import { MdOutlineRemoveDone } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ProductModal from "./product/ProductModal";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { apiDeleteRequest } from "../api/apiRequest";
import { useOutletContext } from "react-router-dom";

const Table = ({ tableData, refreshPage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { userToken } = useOutletContext();
    const colorMode = useColorMode();
    const toast = useToast();

    const handleRemove = (id) => {
        apiDeleteRequest("/api/product", userToken, { id })
            .then(() => {
                toast({
                    title: `محصول با موفقیت حذف شد!`,
                    status: "success",
                    position: "top",
                });
                refreshPage();
            })
            .catch((err) => {
                toast({
                    title: `خطایی رخ داده است!`,
                    status: "error",
                    position: "top",
                    isClosable: true,
                });
            });
    };

    const createData = (item) => {
        const { id, title, brand, description, image, price, status, url } =
            item;
        return (
            <tr
                key={id}
                bg={colorMode === "light" ? "gray.300" : "gray.700"}
                className={`border-b ${useColorModeValue(
                    "hover:bg-gray-100",
                    "hover:bg-gray-800"
                )}`}
            >
                <td className="text-center py-4 whitespace-nowrap text-[8px] md:text-[10px] lg:text-[17px] font-medium ">
                    {id}
                </td>
                <td className="text-center py-4 whitespace-nowrap text-[8px] md:text-[10px] lg:text-[17px] font-medium ">
                    {title}
                </td>
                <td className="text-center py-4 whitespace-nowrap text-[10px] md:text-md font-medium ">
                    {status === true ? (
                        <IoCheckmarkDoneSharp className="bg-white text-blue-600 rounded-full MdOutlineRemoveDone text-xl md:text-2xl inline" />
                    ) : (
                        <MdOutlineRemoveDone className="bg-white text-black rounded-full MdOutlineRemoveDone text-xl md:text-2xl inline" />
                    )}
                </td>
                <td className="text-center py-4 whitespace-nowrap text-[8px] md:text-[10px] lg:text-[17px] font-medium ">
                    <a href={url} className="text-blue-500">
                        لینک
                    </a>
                </td>
                <td className="text-center py-4 whitespace-nowrap text-[8px] md:text-[10px] lg:text-[17px] font-medium ">
                    <Button
                        rightIcon={<Icon as={FaPencil} />}
                        onClick={onOpen}
                        fontSize={{ base: "8px", md: "10px", lg: "17px" }}
                    >
                        ویرایش
                    </Button>
                </td>
                <td className="text-center py-4 whitespace-nowrap text-[8px] md:text-[10px] lg:text-[17px] font-medium ">
                    <Button
                        rightIcon={<Icon as={FaTrash} />}
                        onClick={() => handleRemove(id)}
                        fontSize={{ base: "8px", md: "10px", lg: "17px" }}
                    >
                        حذف
                    </Button>
                </td>
            </tr>
        );
    };
    return (
        <>
            <tbody className="border-2">
                {tableData && createData(tableData)}
            </tbody>
            <ProductModal
                isOpen={isOpen}
                onClose={onClose}
                dataContentModal={tableData}
            />
        </>
    );
};

export default Table;
