import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { apiGetRequest } from "../api/apiRequest";
import { Pagination, ProductModal, Table } from "../components/index";
import { Button, useDisclosure } from "@chakra-ui/react";

function Product() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let counter = 1;
  const { userToken, userContent } = useOutletContext();
  const [productData, setDataProduct] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [boxButtons, setBoxButtons] = useState();

  // TODO:
  useEffect(() => {
    apiGetRequest(
      `/api/product?upid=${userContent.user_plan_id}&page=${currentPage}`,
      userToken
    ).then((res) => {
      // current page
      console.log(res.data.products);
      setDataProduct(res.data.products);
      console.log(productData);
      setBoxButtons(res.data.pageCount);
    });
  }, [currentPage]);

  return (
    <div className="">
      <Button onClick={onOpen}>Click</Button>
      {productData &&
        productData.map((item, idx) => {
          return <Table key={idx} tableData={item} />;
        })}
      <Pagination
        currentPage={currentPage}
        boxContent={boxButtons}
        productData={productData}
        setCurrentPage={setCurrentPage}
      />
      <ProductModal isOpen={isOpen} onClose={onClose} product={productData} />
    </div>
  );
}

export default Product;
