import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { apiGetRequest } from "../api/apiRequest";
import {
    CreateProductModal,
    Loading,
    PageTitle,
    Pagination,
    Table,
} from "../components/index";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    Icon,
    useColorMode,
    useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { FaArrowRotateLeft, FaPencil, FaTrash } from "react-icons/fa6";

function Product() {
    const [loading, setLoading] = useState(true);
    const { colorMode } = useColorMode();

    const {
        isOpen: isOpenCreateProductModal,
        onOpen: onOpenCreateProductModal,
        onClose: onCloseCreateProductModal,
    } = useDisclosure();

    const { userToken, userContent } = useOutletContext();
    const [productData, setDataProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [boxButtons, setBoxButtons] = useState();

    const refreshPage = () => {
        setDataProduct([]);
        setBoxButtons(undefined);
        setLoading(true);

        apiGetRequest(
            `/api/product?upid=${userContent.user_plan_id}&page=${currentPage}`,
            userToken
        ).then((res) => {
            // current page
            setDataProduct(res.data.products);
            setBoxButtons(res.data.pageCount);
        }).finally(() => {
          setLoading(false);
        });
    };

    // TODO:
    useEffect(() => {
        refreshPage();
    }, [currentPage]);

    return (
        <div className="my-3">
            <PageTitle title="محصولات | دستیار هوشمند هیکس" />
            {loading && <Loading />}
            {!loading && (
                <div className="w-[97%] mx-auto rounded-md">
                    <Flex
                        justifyContent="space-between"
                        gap={4}
                        alignItems="center"
                        mb={5}
                    >
                        <Flex flexDir={{ base: "column", lg: "row" }} gap={2}>
                            <Button
                                leftIcon={<FaPlus />}
                                bg="#F05E22"
                                color="white"
                                onClick={onOpenCreateProductModal}
                                shadow="lg"
                                _hover={{ opacity: "0.9" }}
                                fontSize={{ base: "14px", md: "18px" }}
                            >
                                اضافه کردن محصول
                            </Button>

                            <Button
                                leftIcon={<FaArrowRotateLeft />}
                                bg="#F05E22"
                                color="white"
                                onClick={refreshPage}
                                shadow="lg"
                                _hover={{ opacity: "0.9" }}
                                fontSize={{ base: "14px", md: "18px" }}
                            >
                                بروزرسانی محصولات
                            </Button>
                        </Flex>
                        <Box>
                            <Alert
                                shadow="md"
                                fontSize={{ base: "8px", sm: "14px" }}
                                status="info"
                                rounded="lg"
                                bg={
                                    colorMode === "light" ? "gray.300" : "black"
                                }
                            >
                                <AlertIcon />
                                برای دیدن جزئیات بیشتر روی فیلد آیتم ها کلیک
                                فرمایید!
                            </Alert>
                        </Box>
                    </Flex>
                    <table className="w-full overflow-x-scroll">
                        <thead className="bg-[#3e256b] border-b ">
                            <tr className="text-white font-bold">
                                <th
                                    scope="col"
                                    className="text-[10px] md:text-lg font-bold  text-center py-4"
                                >
                                    کد محصول
                                </th>
                                <th
                                    scope="col"
                                    className="text-[10px] md:text-lg font-bold  text-center py-4"
                                >
                                    عنوان
                                </th>
                                <th
                                    scope="col"
                                    className="text-[10px]  md:text-lg font-bold  text-center py-4"
                                >
                                    موجود
                                </th>
                                <th
                                    scope="col"
                                    className="text-[10px]  md:text-lg font-bold  text-center py-4"
                                >
                                    لینک
                                </th>
                                <th
                                    scope="col"
                                    className="text-[10px]  md:text-lg font-bold  text-center py-4"
                                >
                                    ویرایش <Icon as={FaPencil} />
                                </th>
                                <th
                                    scope="col"
                                    className="text-[10px]  md:text-lg font-bold  text-center py-4"
                                >
                                    حذف <Icon as={FaTrash} />
                                </th>
                            </tr>
                        </thead>
                        {productData &&
                            productData.map((item, idx) => {
                                return (
                                    <Table
                                        key={idx}
                                        tableData={item}
                                        currentPage={currentPage}
                                        refreshPage={refreshPage}
                                    />
                                );
                            })}
                    </table>
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                boxContent={boxButtons}
                productData={productData}
                setCurrentPage={setCurrentPage}
            />
            <CreateProductModal
                isOpen={isOpenCreateProductModal}
                onClose={onCloseCreateProductModal}
            />
        </div>
    );
}

export default Product;
