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

const PricePlan = ({ }) => {
  // prop
  const {
    userToken
  } = useOutletContext()
  const [monthOne, setMonthOne] = useState();
  const [monthThree, setMonthTwo] = useState();
  const [monthOneYear, setMonthThree] = useState();


  useEffect(() => {
    apiGetRequest("api/plan", userToken).then(res => {
      const plans = res.data.data;
      const plansOneMonth = plans.filter(plan => plan.days == 30);
      const plansThreeMonth = plans.filter(plan => plan.days == 90);
      const plansOneYear = plans.filter(plan => plan.days == 365);
      
      setMonthOne(plansOneMonth);;
    }).catch(error => {
      console.log(error);
    })
  }, [])


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
            {monthOne && 
            <>
              <TabPanel>
                <PricePlanHeading />
                <Pricing monthOne={monthOne} userToken={userToken} />
                <OneMonthPackageTable oneMonthPackage={oneMonthPackage}  />

              </TabPanel>
              <TabPanel>
                <PricePlanHeading />
                <Pricing />
                <SixMonthPackageTable sixMonthPackage={sixMonthPackage} />
              </TabPanel>
              <TabPanel>
                <PricePlanHeading />
                <Pricing />
                <OneYearPackageTable oneYearPackage={oneYearPackage} />
              </TabPanel>
            </>}
          </TabPanels>
        </Tabs>
      </Center>
    </Box>
  );
};

export default PricePlan;
