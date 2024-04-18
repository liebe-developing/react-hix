import { extendTheme, useColorModeValue } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  
  styles: {
    global: () => ({
      body: {
        bg: useColorModeValue("white", "gray.900"),
        color: useColorModeValue("black", "gray.300"),
        direction: "rtl",
        fontFamily: "IRANSans",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: useColorModeValue("#aaa", "#4f5765"),
          borderRadius: "24px",
        },
      },
    }),
  },
});

export default theme;


