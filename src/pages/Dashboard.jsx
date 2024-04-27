import { Box, Flex } from "@chakra-ui/react";
import {
  MediaBox,
  Stats,
  Loading,
  Error,
  ActiveOperators,
} from "../components/index";
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
    <Flex
      pt="2"
      pb="4"
      px="4"
      flexWrap="wrap"
      flexDirection={{ base: "column", sm: "column", lg: "row" }}
      gap={12}
    >
      <Box flex={1.2}>
        <MediaBox />
        <Flex
          flexWrap="wrap"
          justifyContent="space-around"
          gap={4}
          mt={8}
          rowGap={4}
          flexDir={"row"}
        >
          {fistNavlinkData.map((item, i) => (
            <NavlinkBox key={i} {...item} />
          ))}
        </Flex>
        <ActiveOperators loading={loading} operators={getValueDashboard?.operators} />
      </Box>
      <Box flex={1}>
        {loading && <Loading />}
        {error && <Error title="مشکلی پیش آمده است" />}
        {!loading && !error && getValueDashboard && (
          <Flex
            flexWrap="wrap"
            columnGap={4}
            rowGap={8}
            justifyContent="space-between"
            flexGrow={1}
          >
            <Stats
              title="تعداد مکالمات"
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
        )}
      </Box>
    </Flex>
  );
};

export default Dashboard;
