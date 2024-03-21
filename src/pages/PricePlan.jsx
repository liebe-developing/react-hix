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

const PricePlan = () => {
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
              <Pricing />
              <OneMonthPackageTable oneMonthPackage={oneMonthPackage} />
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
          </TabPanels>
        </Tabs>
      </Center>
    </Box>
  );
};

export default PricePlan;
