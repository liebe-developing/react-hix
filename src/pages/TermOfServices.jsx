import { Box, Text, useColorMode } from "@chakra-ui/react";
import { rulesData } from "../constants";
import { useEffect } from "react";
import { PageTitle } from "../components";


export default function TermOfServices() {
    const {colorMode} = useColorMode();

    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    
    return (
        <Box className="flex flex-col items-center justify-start gap-6 mt-2 w-full">
            <PageTitle title="قوانین | دستیار هوشمند هیکس" />
            <Text fontSize="x-large" className="drop-shadow-xl" >
                قوانین و شرایط استفاده خدمات <span className="text-blue-700">هیکس</span>
            </Text>
            <Text fontSize={{ base: "sm",md: "large" }} >
                در صورت استفاده از سامانه هیکس, شما قوانین و شرایط زیر را پذیرفته اید.
            </Text>
            <div className="w-[95%] mx-auto rounded-md px-6 md:px-12 py-6 shadow-xl">
                <Text fontSize={{ base: "sm",md: "large" }} >
                    حق بروز رسانی و ایجاد تغییرات در این قوانین بدون اطلاع قبلی برای هیکس, محفوظ است. همچنین در صورت عدم رعایت هر کدام از موارد زیر ، دسترسی شما به خدمات هیکس محدود خواهد شد.        
            </Text>
                <ul className={`list-decimal mt-7 gap-3 ${colorMode === "light" ? "text-gray-800" : "text-gray-300"}`}>
                    {rulesData.map((item, i) => {
                        return <li key={i} className="my-5 text-sm md:text-md">{item.label}</li>
                    })}
                </ul>
            </div>
           
        </Box>
    )
}
