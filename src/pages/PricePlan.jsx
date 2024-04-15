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
  Loading,
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
  const { userToken, userContent } = useOutletContext();
  const [free, setFree] = useState();
  const [oneMonth, setOneMonth] = useState();
  const [sixMonth, setSixMonth] = useState();
  const [oneYear, setOneYear] = useState();
  const [isLoding, setisLoding] = useState(false);

  useEffect(() => {
    apiGetRequest("api/plan", userToken)
      .then((res) => {
        const plans = res.data.data;
        const freePlan = plans.filter((plan) => plan.price === 0);
        const oneMonthPlans = plans.filter((plan) => plan.days === 30);
        const sixMonthPlans = plans.filter((plan) => plan.days === 180);
        const oneYearPlans = plans.filter((plan) => plan.days === 365);

        setOneMonth(oneMonthPlans);
        setSixMonth(sixMonthPlans);
        setOneYear(oneYearPlans);
        setFree(freePlan);
      })
      .catch((error) => {
        console.log(error);
      });
    setisLoding(true);
  }, []);

  // console.log(oneMonth);
  return (
    <>
      {!isLoding && <Loading />}
      {isLoding && (
        <Box>
          <Center>
            <Tabs colorScheme="purple" w="full">
              <TabList maxW="70%" mx="auto">
                {free && (
                  <Tab w="full" fontSize="20px">
                    رایگان
                  </Tab>
                )}
                {oneMonth && (
                  <Tab w="full" fontSize="20px">
                    ۱ ماهه
                  </Tab>
                )}
                {sixMonth && (
                  <Tab w="full" fontSize="20px">
                    ۶ ماهه
                  </Tab>
                )}
                {oneYear && (
                  <Tab w="full" fontSize="20px">
                    ۱ ساله
                  </Tab>
                )}
              </TabList>
              <TabPanels>
                {free && (
                  <TabPanel>
                    <PricePlanHeading />
                    <Pricing
                      monthPlan={free}
                      userToken={userToken}
                      userContent={userContent}
                    />
                    <OneMonthPackageTable oneMonthPackage={oneMonthPackage} />
                  </TabPanel>
                )}
                {oneMonth && (
                  <TabPanel>
                    <PricePlanHeading />
                    <Pricing monthPlan={oneMonth} userToken={userToken} />
                    <OneMonthPackageTable oneMonthPackage={oneMonthPackage} />
                  </TabPanel>
                )}

                {sixMonth && (
                  <TabPanel>
                    <PricePlanHeading />
                    <Pricing monthPlan={sixMonth} userToken={userToken} />
                    <SixMonthPackageTable sixMonthPackage={sixMonthPackage} />
                  </TabPanel>
                )}

                {oneYear && (
                  <TabPanel>
                    <PricePlanHeading />
                    <Pricing monthPlan={oneYear} userToken={userToken} />
                    <OneYearPackageTable oneYearPackage={oneYearPackage} />
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </Center>
        </Box>
      )}
    </>
  );
};

export default PricePlan;
