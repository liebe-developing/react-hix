import { Box, Flex } from "@chakra-ui/react";
import {
  MediaBox,
  Stats,
  PopularProducts,
  PopularClients,
} from "../components/index";
import { useState,useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { fistNavlinkData, secondNavlinkData } from "../constants";
import NavlinkBox from "../components/Dashboard/NavlinkBox";
import { apiGetRequest } from "../api/apiRequest";


const Dashboard = () => {
  const {userToken,userContent } = useOutletContext() 
  const [getValueDashboard, setgetValueDashboard] = useState()
  useEffect(() => {
    apiGetRequest(`api/dashboard/${userContent.user_plan_id}`,userToken).then(res => {
      setgetValueDashboard(res.data.data)
      console.log(res.data.data);
    })
  
  }, [])
  
  return (
    <Flex flexWrap="wrap" gap={12}>
      <Box flex={1.2}>
        <MediaBox />
        <Flex flexWrap="wrap" justifyContent="space-between" my={8} rowGap={4}>
          {fistNavlinkData.map((item, i) => (
            <NavlinkBox key={i} {...item} />
          ))}
        </Flex>
        
      </Box>
      <Box
        bg="rgba(255, 109, 0, 0.3)"
        height="inherit"
        w={"2px"}
        display={{ base: "none", md: "flex" }}
      ></Box>
      {
        getValueDashboard &&
        <Box flex={1}>
          <Flex flexWrap="wrap" columnGap={8} rowGap={8} justifyContent="start">
            <Stats title="تعداد کاربران" value={`${getValueDashboard.maxChats - getValueDashboard.remainingChats} / ${getValueDashboard.maxChats}`} />
            <Stats title="اپراتورها" value={`${getValueDashboard.operatorCount} / ${getValueDashboard.maxOperators}`} />
            <Stats title="محصولات" value={`${getValueDashboard.productCount}`} />
            <Stats title="روزهای باقی مانده" value={`${getValueDashboard.remainingDays} / ${getValueDashboard.maxDays}`} />
          </Flex>

          {/* <PopularProducts /> */}
        </Box>
      }
      
    </Flex>
  );
};

export default Dashboard;
