import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { apiGetRequest } from "../api/apiRequest";
import { Loading, Pagination,Table } from "../components/index";



function Product() {
  
  const [loading, setLoading] = useState(false);

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
      setLoading(true)
    });
  }, [currentPage]);

  return (
    <div className="">
      {!loading && <Loading />}
      {loading && (
        <div className=" rounded-md">
          <h3 className="my-3 mr-5 bg-red-400 text-white inline-block p-2 rounded-xl shadow-2xl border-black border-2"
          >برای دیدن جزئیات  بیشتر روی فیلد آیتم ها کلیک فرمایید!</h3>
          <table className="w-[97%] mx-auto overflow-x-scroll">
            <thead className="bg-blue-500 border-b ">
              <tr className="text-white">
                <th scope="col" className="text-[14px] md:text-sm font-medium  text-center py-4">
                  شمارنده
                </th>
                <th scope="col" className="text-[14px] md:text-sm font-medium  text-center py-4">
                  عنوان
                </th>
                <th scope="col" className="text-[14px] md:text-sm font-medium  text-center py-4">
                  موجود
                </th>
                <th scope="col" className="text-[14px]  md:text-sm font-medium  text-center py-4">
                  لینک
                </th>
              </tr>
            </thead>
            {productData &&
              productData.map((item, idx) => {
                return <Table key={idx} tableData={item} currentPage={currentPage} />;
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

    </div>
  );
}

export default Product;
