import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  OneYearPackageTable,
  OneMonthPackageTable,
  SixMonthPackageTable,
  PricePlanHeading,
  Pricing,
} from "../components";
import {
  oneMonthPackage,
  sixMonthPackage,
  oneYearPackage,
} from "../constants/index";

import { useOutletContext } from "react-router-dom";
import { apiGetRequest } from "../api/apiRequest";
import { useEffect, useState } from "react";

const PricePlan = () => {
  // prop
  const { userToken } = useOutletContext();
  const [oneMonth, setOneMonth] = useState();
  const [monthThree, setSixMonth] = useState();
  const [monthOneYear, setOneYear] = useState();

  useEffect(() => {
    apiGetRequest("api/plan", userToken)
      .then((res) => {
        const plans = res.data.data;
        const oneMonthPlans = plans.filter((plan) => plan.days === 30);
        const sixMonthPlans = plans.filter((plan) => plan.days === 180);
        const oneYearPlans = plans.filter((plan) => plan.days === 365);

        setOneMonth(oneMonthPlans);
        setSixMonth(sixMonthPlans);
        setOneYear(oneYearPlans);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(oneMonth);
  return (
    <Box>
      <Center>
        <Tabs colorScheme="purple" w="full">
          <TabList>
            <Tab w="full" fontSize="20px">
              ۱ ماهه
            </Tab>
            <Tab w="full" fontSize="20px">
              ۶ ماهه
            </Tab>
            <Tab w="full" fontSize="20px">
              ۱ ساله
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PricePlanHeading />
              <Pricing monthPlan={oneMonth} userToken={userToken} />
              <OneMonthPackageTable oneMonthPackage={oneMonthPackage} />
            </TabPanel>
            <TabPanel>
              <PricePlanHeading />
              <Pricing monthPlan={monthThree} userToken={userToken} />
              <SixMonthPackageTable sixMonthPackage={sixMonthPackage} />
            </TabPanel>
            <TabPanel>
              <PricePlanHeading />
              <Pricing monthPlan={monthOneYear} userToken={userToken} />
              <OneYearPackageTable oneYearPackage={oneYearPackage} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Box>
  );
};

export default PricePlan;

            // <>
            //   <TabPanel>
            //     <PricePlanHeading />
            //     <Pricing oneMonth={oneMonth} userToken={userToken} />
            //     <OneMonthPackageTable oneMonthPackage={oneMonthPackage} />
            //   </TabPanel>
            //   <TabPanel>
            //     <PricePlanHeading />
            //     <Pricing />
            //     <SixMonthPackageTable sixMonthPackage={sixMonthPackage} />
            //   </TabPanel>
            //   <TabPanel>
            //     <PricePlanHeading />
            //     <Pricing />
            //     <OneYearPackageTable oneYearPackage={oneYearPackage} />
            //   </TabPanel>
            // </>