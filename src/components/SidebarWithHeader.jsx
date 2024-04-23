/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { FiChevronDown, FiBell, FiMenu } from "react-icons/fi";
import {
  FaInstagram,
  FaTelegramPlane,
  FaRegFolder,
  FaRegUser,
} from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { ImStatsDots } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";
import DarkModeButton from "./DarkModeButton";
import { GrUpgrade } from "react-icons/gr";
import { BsCalendarCheck } from "react-icons/bs";
import { apiPostRequest } from "../api/apiRequest";
import { useState } from "react";
import Footer from "./Footer";

const LinkItems = [
  { id: 0, name: "داشبورد", icon: GoHome, href: "/" },
  { id: 1, name: "گزارش ها", icon: ImStatsDots, href: "/report" },
  { id: 2, name: "محصولات", icon: FaRegFolder, href: "/product" },
  { id: 10, name: "چت اپراتور", icon: FaTelegramPlane, href: "/chats" },
  { id: 3, name: "تنظیمات", icon: IoSettingsOutline, href: "/settings" },
  { id: 11, name: "پروفایل", icon: FaRegUser, href: "/profile" },
  { id: 4, name: "راه اندازی", icon: IoCodeSlash, href: "/tool" },
];

const SidebarContent = ({ onClose, userContent, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderLeft="1px"
      borderLeftColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowY="auto"
      py={2.5}
      {...rest}
    >
      <Flex
        mb={10}
        h="10"
        alignItems="center"
        mx="2"
        justifyContent="space-between"
      >
        <img src="/logo_hix.svg" width={130} className="mr-6 mt-6" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.filter(l => userContent?.user_plan_id ? true : (userContent.user.operator_user_plan_id ? l.id >= 10 : false)).map((link) => {
        return (
        // userContent?.user_plan_id ? 
          <Link key={link.name} to={link.href} onClick={onClose}>
            <NavItem icon={link.icon}>{link.name}</NavItem>
          </Link>
        )
        //  : (
        //   <NavItem icon={link.icon} key={link.name}>
        //     {link.name}
        //   </NavItem>
        // );
      })}
      <Link to="/price-plan">
        <Box
          mt={2}
          boxShadow={"2xl"}
          background={useColorModeValue("#FFF", "gray.800")}
          mx={4}
          p={2}
          borderRadius="md"
          cursor="pointer"
        >
          <Flex
            flexDirection="column"
            textAlign={"center"}
            justifyContent="center"
            alignItems="center"
            gap={"12px"}
          >
            <Icon
              as={GrUpgrade}
              w={"20px"}
              h={"20px"}
              color={useColorModeValue("gray.700", "gray.400")}
            />
            <Button colorScheme="whatsapp" variant="solid" w="full" size="sm">
              ارتقا به ویژه
            </Button>
          </Flex>
        </Box>
      </Link>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="16px"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{ color: useColorModeValue("#3C096C", "gray.400") }}
        {...rest}
      >
        {icon && (
          <Icon
            ml="4"
            fontSize="24"
            _groupHover={{
              color: useColorModeValue("#3C096C", "gray.400"),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, userContent, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date().toLocaleDateString("fa-IR", options);

  const handleLogoutUser = () => {
    apiPostRequest("/api/auth/logout")
      .then(() => {
        localStorage.clear();
        window.location.replace("/");
        // window.open((window.location.href = "/dashboard"), "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex
      mr={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <img
          src="logo_hix.svg"
          className="hidden md:static"
          alt="not-found"
          width={100}
        />
      </Text>

      <HStack spacing={{ base: "1.5", md: "1" }}>
        <Flex alignItems={"center"} zIndex={2}>
          <Text
            ml={5}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            gap={2}
            color={useColorModeValue("gray.600", "gray.400")}
            fontSize={{ base: "11px", md: "12.5px" }}
          >
            <BsCalendarCheck />
            {today}
          </Text>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  // size={"sm"}
                  width={{ base: "35px", md: "40px" }}
                  height={{ base: "35px", md: "40px" }}
                  bg={useColorModeValue("gray.300", "white")}
                  src={userContent.user.avatar || "https://s3-alpha-sig.figma.com/img/8b87/d4ec/07e2adaafa5c876cbc7382f809b9bd51?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aDFVBDl3a9HYPxMQKzp-5ENzJXOc~w-4iaafrf2GR3y4KUh1CiV135fHv5sSLdv6DolisHQvUbJIK~ieSYcbJTqjlhz792dhI6pznAqx5k4xub2pW~~PljiBYlqZn3mvA5aT4iAb94G8nvipRjM-jBNKSN0z5f1DiIbqSfdTCwHiEfCdC~pH8jhH~gJR9zju4QgLQPLuUExp3YIiLJxQ3jP90cw7lJOJTCVM5t1R4L5qCAOehWmLfxMrM8XF0TqoPfbJgUqDmz-pNtTfepqNGMFEIIeyURgKS8dEg7mG8zpyl9Q6p0bZwGZJvSic~FR0pwGpmEYolJaSJjgaNNSBAA__"}
                  borderRadius={"100%"}
                  border={"solid 1px #3e256b"}

                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="14px" lineHeight={"23.24px"} fontWeight={500}>
                    {userContent?.user?.name}
                  </Text>
                  <Text
                    fontSize="12px"
                    lineHeight={"19.92px"}
                    fontWeight={500}
                    color={useColorModeValue("gray.600", "gray.400")}
                  >
                    {userContent?.plan ? userContent?.plan?.title : ""}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              borderColor={useColorModeValue("gray.200", "gray.600")}
              fontSize={{ base: "13px", md: "15px" }}
            >
              {/* <MenuItem>اعلانات</MenuItem>
              <MenuItem>توصیه حساب</MenuItem> */}
              {/* <MenuDivider /> */}
              <MenuItem
                _hover={{ bg: "red", color: "white" }}
                onClick={handleLogoutUser}
              >
                خارج شدن از حساب
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <IconButton
          size={{ base: "sm", md: "md" }}
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <DarkModeButton
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ userContent, userAuth: userToken }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        userContent={userContent}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} userContent={userContent} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} userContent={userContent} />
      <Box mr={{ base: 0, md: 60 }}>
        <Outlet
          context={{
            userToken,
            userContent,
          }}
        />
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
