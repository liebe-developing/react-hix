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

const LinkItems = [
  { name: "داشبورد", icon: GoHome, href: "/" },
  { name: "گزارش ها", icon: ImStatsDots, href: "/report" },
  { name: "محصولات", icon: FaRegFolder, href: "/" },
  { name: "دستورات", icon: IoSettingsOutline, href: "/" },
  { name: "اینستاگرام", icon: FaInstagram, href: "/" },
  { name: "چت اپراتور", icon: FaTelegramPlane, href: "/chats" },
  { name: "تنظیمات", icon: IoSettingsOutline, href: "/settings" },
  { name: "پروفایل", icon: FaRegUser, href: "/profile" },
  { name: "راه اندازی", icon: IoCodeSlash, href: "/tool" },
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
        mx="8"
        justifyContent="space-between"
      >
        <img src="/logo_hix.svg" width={150} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => {
        return userContent?.user_plan_id ? (
          <Link key={link.name} to={link.href}>
            <NavItem icon={link.icon}>{link.name}</NavItem>
          </Link>
        ) : (
          <NavItem icon={link.icon} key={link.name}>
            {link.name}
          </NavItem>
        );
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
            _groupHover={{ color: useColorModeValue("#3C096C", "gray.400") }}
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
        window.open((window.location.href = "/sign-in"), "_blank");
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
        <svg
          width="121"
          height="37"
          viewBox="0 0 121 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48.12 29.45C45.9 29.45 44.06 28.98 42.6 28.04C41.14 27.1 40.12 25.83 39.54 24.23L44.13 21.56C44.91 23.42 46.29 24.35 48.27 24.35C49.91 24.35 50.73 23.88 50.73 22.94C50.73 22.32 50.26 21.82 49.32 21.44C48.92 21.28 48.04 21.01 46.68 20.63C44.76 20.07 43.24 19.29 42.12 18.29C41 17.27 40.44 15.86 40.44 14.06C40.44 12.12 41.13 10.55 42.51 9.35C43.91 8.15 45.65 7.55 47.73 7.55C49.49 7.55 51.05 7.96 52.41 8.78C53.77 9.6 54.81 10.79 55.53 12.35L51.03 14.99C50.37 13.43 49.28 12.65 47.76 12.65C47.12 12.65 46.63 12.78 46.29 13.04C45.97 13.3 45.81 13.63 45.81 14.03C45.81 14.49 46.05 14.88 46.53 15.2C47.03 15.52 47.99 15.89 49.41 16.31C50.43 16.61 51.25 16.89 51.87 17.15C52.49 17.41 53.17 17.79 53.91 18.29C54.65 18.77 55.2 19.4 55.56 20.18C55.92 20.94 56.1 21.84 56.1 22.88C56.1 24.94 55.37 26.55 53.91 27.71C52.45 28.87 50.52 29.45 48.12 29.45ZM66.4223 23.96H74.5523V29H61.0523V8H74.4023V13.01H66.4223V15.92H73.6523V20.87H66.4223V23.96Z"
            fill="#3C096C"
          />
          <path
            d="M120.05 8V13.19H114.86V29H109.49V13.19H104.3V8H120.05Z"
            fill="#3C096C"
          />
          <circle cx="90" cy="18" r="4" fill="#FF6D00" />
          <path
            d="M2.04899 17H7.01599C7.10199 14.267 7.54199 11.777 8.23199 9.88001C8.40899 9.39401 8.60599 8.93501 8.82499 8.51501C5.16199 9.74001 2.44399 13.028 2.04899 17ZM12 6C5.373 6 0 11.373 0 18C0 24.627 5.373 30 12 30C18.627 30 24 24.627 24 18C24 11.373 18.627 6 12 6ZM11.9996 8C11.8486 8 11.5756 8.081 11.2006 8.516C10.8296 8.948 10.4496 9.632 10.1106 10.563C9.5136 12.207 9.1026 14.456 9.0166 17H14.9826C14.8966 14.456 14.4856 12.207 13.8886 10.563C13.5496 9.632 13.1696 8.948 12.7986 8.516C12.4236 8.081 12.1506 8 11.9996 8ZM16.984 17C16.897 14.267 16.458 11.777 15.768 9.88001C15.591 9.39401 15.394 8.93501 15.175 8.51501C18.838 9.74001 21.556 13.028 21.951 17H16.984ZM14.9826 19H9.0166C9.1026 21.544 9.5136 23.793 10.1106 25.437C10.4496 26.368 10.8296 27.052 11.2006 27.484C11.5756 27.919 11.8486 28 11.9996 28C12.1506 28 12.4236 27.919 12.7986 27.484C13.1696 27.052 13.5496 26.368 13.8886 25.437C14.4856 23.793 14.8966 21.544 14.9826 19ZM15.175 27.485C15.394 27.065 15.591 26.606 15.768 26.12C16.458 24.223 16.897 21.733 16.984 19H21.951C21.556 22.972 18.838 26.26 15.175 27.485ZM8.82499 27.485C8.60599 27.065 8.40899 26.606 8.23199 26.12C7.54199 24.223 7.10199 21.733 7.01599 19H2.04899C2.44399 22.972 5.16199 26.26 8.82499 27.485Z"
            fill="#FF6D00"
          />
        </svg>
      </Text>

      <HStack spacing={{ base: "1.5", md: "1" }}>
        <Flex alignItems={"center"}>
          <Text
            className="flex items-center gap-1.5 ml-7"
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
                  src={
                    "https://s3-alpha-sig.figma.com/img/8b87/d4ec/07e2adaafa5c876cbc7382f809b9bd51?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aDFVBDl3a9HYPxMQKzp-5ENzJXOc~w-4iaafrf2GR3y4KUh1CiV135fHv5sSLdv6DolisHQvUbJIK~ieSYcbJTqjlhz792dhI6pznAqx5k4xub2pW~~PljiBYlqZn3mvA5aT4iAb94G8nvipRjM-jBNKSN0z5f1DiIbqSfdTCwHiEfCdC~pH8jhH~gJR9zju4QgLQPLuUExp3YIiLJxQ3jP90cw7lJOJTCVM5t1R4L5qCAOehWmLfxMrM8XF0TqoPfbJgUqDmz-pNtTfepqNGMFEIIeyURgKS8dEg7mG8zpyl9Q6p0bZwGZJvSic~FR0pwGpmEYolJaSJjgaNNSBAA__"
                  }
                  borderRadius={"10px"}
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
              <MenuItem>اعلانات</MenuItem>
              <MenuItem>توصیه حساب</MenuItem>
              <MenuDivider />
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
      <Box mr={{ base: 0, md: 60 }} p="6">
        <Outlet
          context={{
            userToken,
            userContent,
          }}
        />
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
