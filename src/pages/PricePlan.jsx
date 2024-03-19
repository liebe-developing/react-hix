import {
  Box,
  Center,
  Heading,
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
} from "../components";
import {
  oneMonthPackage,
  sixMonthPackage,
  oneYearPackage,
} from "../constants/index";

const PricePlan = () => {
  console.log(oneMonthPackage);
  return (
    <Box>
      <Heading
        boxShadow="0px -6px 32px -7px rgba(105, 68, 216, 0.75)"
        fontSize="22px"
        borderRadius="10px"
        p="10px 20px"
        w="fit-content"
        mb={20}
        mt={5}
      >
        مقایسه امکانات بسته ها
      </Heading>
      <Center>
        <Tabs colorScheme="purple" w="full">
          <TabList>
            <Tab w="full" fontSize="22px" fontFamily="Casablanca">
              1 ماهه
            </Tab>
            <Tab w="full" fontSize="22px" fontFamily="Casablanca">
              6 ماهه
            </Tab>
            <Tab w="full" fontSize="22px" fontFamily="Casablanca">
              1 ساله
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <OneMonthPackageTable oneMonthPackage={oneMonthPackage} />
            </TabPanel>
            <TabPanel>
              <SixMonthPackageTable sixMonthPackage={sixMonthPackage} />
            </TabPanel>
            <TabPanel>
              <OneYearPackageTable oneYearPackage={oneYearPackage} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Box>
  );
};

export default PricePlan;
