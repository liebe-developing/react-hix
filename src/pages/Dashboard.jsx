import { Box, Flex } from "@chakra-ui/react";
import { MediaBox, Stats, Loading, Error } from "../components/index";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { fistNavlinkData } from "../constants";
import NavlinkBox from "../components/Dashboard/NavlinkBox";
import { apiGetRequest } from "../api/apiRequest";

const Dashboard = () => {
  const { userToken, userContent } = useOutletContext();
  const [getValueDashboard, setgetValueDashboard] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiGetRequest(`api/dashboard/${userContent.user_plan_id}`, userToken)
      .then((res) => {
        if (res.status === 200) {
          setgetValueDashboard(res.data.data);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <Flex py="1" px="2" flexWrap="wrap" mx={{base: 5, md: 0}} flexDirection={{ base: "column", sm: "column",lg: "row" }} gap={12}>
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
      <Box flex={1}>
        {loading && <Loading />}
        {error && <Error title="مشکلی پیش آمده است" />}
        {!loading && !error && getValueDashboard && (
          <Flex flexWrap="wrap" columnGap={4} rowGap={8} justifyContent="start">
            <Stats
              title="تعداد کاربران"
              value={`${
                getValueDashboard.maxChats - getValueDashboard.remainingChats
              } / ${getValueDashboard.maxChats}`}
            />
            <Stats
              title="اپراتورها"
              value={`${getValueDashboard.operatorCount} / ${
                getValueDashboard.maxOperators === 999999999
                  ? "نامحدود"
                  : getValueDashboard.maxOperators
              }`}
            />
            <Stats
              title="محصولات"
              value={`${getValueDashboard.productCount}`}
            />
            <Stats
              
              title="روزهای باقی مانده"
              value={`${getValueDashboard.remainingDays} / ${getValueDashboard.maxDays}`}
            />
          </Flex>
          // <PopularProducts />
        )}
      </Box>
    </Flex>
  );
};

export default Dashboard;
