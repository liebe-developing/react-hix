import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { apiGetRequest } from "../api/apiRequest";
import {
  CreateProductModal,
  Loading,
  Pagination,
  Table,
} from "../components/index";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus, FaInfo, FaInfoCircle } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";

function Product() {
  const [loading, setLoading] = useState(false);
  const {
    isOpen: isOpenCreateProductModal,
    onOpen: onOpenCreateProductModal,
    onClose: onCloseCreateProductModal,
  } = useDisclosure();

  let counter = 1;
  const { userToken, userContent } = useOutletContext();
  const [productData, setDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [boxButtons, setBoxButtons] = useState();

  // TODO:
  useEffect(() => {
    apiGetRequest(
      `/api/product?upid=${userContent.user_plan_id}&page=${currentPage}`,
      userToken
    ).then((res) => {
      // current page
      setDataProduct(res.data.products);
      setBoxButtons(res.data.pageCount);
      setLoading(true);
    });
  }, [currentPage]);

  return (
    <div className="">
      {!loading && <Loading />}
      {loading && (
        <div className="w-[97%] mx-auto rounded-md">
          <Flex justifyContent="space-between" gap={4} alignItems="center" mb={5}>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="purple"
              onClick={onOpenCreateProductModal}
              shadow="lg"
            >
              اضافه کردن محصول
            </Button>
            <Box>
              <Alert shadow="md" fontSize={{ base: '11px', sm:'14px'}} status="info" rounded="lg">
                <AlertIcon />
                برای دیدن جزئیات بیشتر روی فیلد آیتم ها کلیک فرمایید!
              </Alert>
            </Box>
          </Flex>
          <table className="w-full overflow-x-scroll">
            <thead className="bg-blue-500 border-b ">
              <tr className="text-white">
                <th
                  scope="col"
                  className="text-[10px] md:text-sm font-medium  text-center py-4"
                >
                  شمارنده
                </th>
                <th
                  scope="col"
                  className="text-[10px] md:text-sm font-medium  text-center py-4"
                >
                  عنوان
                </th>
                <th
                  scope="col"
                  className="text-[10px]  md:text-sm font-medium  text-center py-4"
                >
                  موجود
                </th>
                <th
                  scope="col"
                  className="text-[10px]  md:text-sm font-medium  text-center py-4"
                >
                  لینک
                </th>
              </tr>
            </thead>
            {productData &&
              productData.map((item, idx) => {
                return (
                  <Table key={idx} tableData={item} currentPage={currentPage} />
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
