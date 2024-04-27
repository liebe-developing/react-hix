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
  PageTitle,
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
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    apiGetRequest("api/plan", userToken)
      .then((res) => {
        setIsLoding(false);
        const plans = res.data.data.map((p) => {
          console.log(p.id + " , " + userContent.plan.id);
          return {
            ...p,
            relativeCurrent: !userContent.user_plan_id
              ? 0
              : p.id > userContent.plan.id
              ? 1
              : 0,
            current: userContent.user_plan_id && p.id == userContent.plan.id,
          };
        });
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
        setIsLoding(false);
      });
  }, []);

  // console.log(oneMonth);
  return (
    <>
      <PageTitle title="تعرفه‌ها | دستیار هوشمند هیکس" />
      {isLoding ? (
        <Loading emColor="purple.100" color="purple" />
      ) : (
        <Box>
          <Center>
            <Tabs colorScheme="purple" w="full">
              <TabList maxW={{ base: "full", md: "70%" }} mx="auto">
                {free && free.length > 0 && (
                  <Tab w="full" fontSize={{ base: "15px", md: "20px" }}>
                    رایگان
                  </Tab>
                )}
                {oneMonth && oneMonth.length > 0 && (
                  <Tab w="full" fontSize={{ base: "15px", md: "20px" }}>
                    ۱ ماهه
                  </Tab>
                )}
                {sixMonth && sixMonth.length > 0 && (
                  <Tab w="full" fontSize={{ base: "15px", md: "20px" }}>
                    ۶ ماهه
                  </Tab>
                )}
                {oneYear && oneYear.length > 0 && (
                  <Tab w="full" fontSize={{ base: "15px", md: "20px" }}>
                    ۱ ساله
                  </Tab>
                )}
              </TabList>
              <TabPanels>
                {free && free.length > 0 && (
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
                {oneMonth && oneMonth.length > 0 && (
                  <TabPanel>
                    <PricePlanHeading />
                    <Pricing monthPlan={oneMonth} userToken={userToken} />
                    <OneMonthPackageTable oneMonthPackage={oneMonthPackage} />
                  </TabPanel>
                )}

                {sixMonth && sixMonth.length > 0 && (
                  <TabPanel>
                    <PricePlanHeading />
                    <Pricing monthPlan={sixMonth} userToken={userToken} />
                    <SixMonthPackageTable sixMonthPackage={sixMonthPackage} />
                  </TabPanel>
                )}

                {oneYear && oneYear.length > 0 && (
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
