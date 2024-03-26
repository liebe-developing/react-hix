import { Box, Flex } from "@chakra-ui/react";
import {
  MediaBox,
  Stats,
  PopularProducts,
  PopularClients,
} from "../components/index";
import { fistNavlinkData, secondNavlinkData, stats } from "../constants";
import NavlinkBox from "../components/Dashboard/NavlinkBox";

const Dashboard = () => {
  return (
    <Flex flexWrap="wrap" gap={12}>
      <Box flex={1.2}>
        <MediaBox />
        <Flex flexWrap="wrap" justifyContent="space-between" my={8} rowGap={4}>
          {fistNavlinkData.map((item, i) => (
            <NavlinkBox key={i} {...item} />
          ))}
        </Flex>
        <MediaBox />
        <Flex flexWrap="wrap" justifyContent="space-between" my={8} rowGap={4}>
          {secondNavlinkData.map((item, i) => (
            <NavlinkBox key={i} {...item} />
          ))}
        </Flex>
        <PopularClients />
      </Box>
      <Box
        bg="rgba(255, 109, 0, 0.3)"
        height="inherit"
        w={"2px"}
        display={{ base: "none", md: "flex" }}
      ></Box>
      <Box flex={1}>
        <Flex flexWrap="wrap" columnGap={8} rowGap={8} justifyContent="start">
          {stats.map((item, i) => (
            <Stats key={i} {...item} />
          ))}
        </Flex>

        <PopularProducts />
      </Box>
    </Flex>
  );
};

export default Dashboard;
