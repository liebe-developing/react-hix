import {useState,useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import { apiGetRequest } from '../api/apiRequest'
import {Pagination} from '../components/index'


function Product() {
  let counter = 1
  const { userToken, userContent } = useOutletContext()
  const [productData,setDataProduct] = useState()
  const [currentPage,setCurrentPage] = useState(1) 
  const [boxButtons,setBoxButtons] = useState()

  // TODO:
  useEffect(() => {
    apiGetRequest(`/api/product?upid=${userContent.user_plan_id}&page=${currentPage}`,userToken).then(res => {
      // current page
      console.log(res.data.products);
      setDataProduct(res.data.products)
      console.log(productData);
      setBoxButtons(res.data.pageCount)
    })
  }, [currentPage])
  


  return (
   <div className="">
      {
        productData && productData.map((item, index) => {
          return (
            <table>
              {item.title}
            </table>
          )
        })
      }
      <Pagination currentPage={currentPage} boxContent={boxButtons} productData={productData} setCurrentPage={setCurrentPage} />
   </div>
  )
}

export default Product