import {useState,useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import { apiGetRequest } from '../api/apiRequest'
import {Pagination} from '../components/index'


function Product() {
  let counter = 1
  const { userToken, userContent } = useOutletContext()
  const [dataProdcuts,setDataProduct] = useState([])
  const [currentPage,setCurrentPage] = useState(1) 
  const [boxButtons,setBoxButtons] = useState()

  // TODO:
  useEffect(() => {
    apiGetRequest(`/api/product?upid=${userContent.user_plan_id}&page=${currentPage}`,userToken).then(res => {
      console.log(res.data.data);
      setDataProduct(res.data.products)
      setBoxButtons(res.data.pageCount)
    })
  }, [currentPage])
  
  return (
   <div className="">
      <Pagination currentPage={currentPage} boxContent={boxButtons} dataProdcuts={dataProdcuts} setCurrentPage={setCurrentPage} />
   </div>
  )
}

export default Product