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
  MenuItem,
  MenuList,
  useColorMode,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  ListItem,
  List,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { FiChevronDown, FiBell, FiMenu } from "react-icons/fi";
import { FaTelegramPlane, FaRegFolder, FaRegUser } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { ImStatsDots } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";
import DarkModeButton from "./DarkModeButton";
import { GrUpgrade } from "react-icons/gr";
import { BsCalendarCheck } from "react-icons/bs";
import { apiPostRequest } from "../api/apiRequest";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import * as persianTools from "@persian-tools/persian-tools";
import moment from "jalali-moment";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiClock2 } from "react-icons/ci";

const LinkItems = [
  { id: 0, name: "داشبورد", icon: GoHome, href: "/" },
  { id: -1, name: "گزارش ها", icon: ImStatsDots, href: "/report" },
  { id: 1, name: "محصولات", icon: FaRegFolder, href: "/product" },
  { id: 20, name: "چت اپراتور", icon: FaTelegramPlane, href: "/chats" },
  { id: 2, name: "تنظیمات", icon: IoSettingsOutline, href: "/settings" },
  { id: 21, name: "پروفایل", icon: FaRegUser, href: "/profile" },
  { id: 3, name: "راه اندازی", icon: IoCodeSlash, href: "/tool" },
];

const SidebarContent = ({ onClose, userContent, ...rest }) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

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
      // py={2.5}
      {...rest}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        bg={colorMode === "light" ? "#eee" : "#1a202c"}
        flexDirection={"row"}
        className="w-full md:p-5 h-20"
      >
        <img
          src="/logo_hix.svg"
          className={`w-[30%] md:w-[70%] aspect-[1] ${
            colorMode === "light" ? "mix-blend-normal" : "mix-blend-lighten"
          } `}
        />
        <div className="flex md:hidden flex-row flex-grow justify-end px-4">
          <CloseButton onClick={onClose} />
        </div>
      </Flex>
      {LinkItems.map((link) => {
        let available = false;
        if (userContent.user_plan_id) {
          if (userContent.plan.price === 0) {
            if (link.id >= 0) available = true;
          } else {
            available = true;
          }
        } else if (userContent.user.operator_user_plan_id && link.id >= 20) {
          available = true;
        }

        return (
          // userContent?.user_plan_id ?
          <Link
            key={link.name}
            to={available ? link.href : window.location.href}
            onClick={() => {
              onClose();
              if (!available) {
                toast({
                  title: "شما به این بخش از داشبورد دسترسی ندارید.",
                  status: "error",
                });
              }
            }}
          >
            <NavItem icon={link.icon}>{link.name}</NavItem>
          </Link>
        );
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
              w={"22px"}
              h={"22px"}
              color={useColorModeValue("gray.700", "gray.400")}
            />
            <Button
              bg="#F05E22"
              color="white"
              variant="unstyled"
              _hover={{ opacity: 0.9 }}
              w="full"
              size="md"
            >
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
        p="8px"
        mx="4"
        my={6}
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

const MobileNav = ({ onOpen, userContent, userToken, avatar, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date().toLocaleDateString("fa-IR", options);
  const [scrolled, setScrolled] = useState(false);

  const handleLogoutUser = () => {
    apiPostRequest("/api/auth/logout", userToken)
      .then(() => {
        localStorage.clear();
        window.location.replace("/");
        // window.open((window.location.href = "/dashboard"), "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(userContent.notifications);

  return (
    <Flex
      mr={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height={"80px"}
      pos="sticky"
      top={0}
      zIndex={999}
      alignItems="center"
      boxShadow={scrolled && "0 2px 5px rgba(0,0,0,0.1)"}
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Flex alignItems="center" gap={2}>
        <Icon as={TfiHeadphoneAlt} boxSize={6} />
        <Link to="tel:+989395060614">
          <Text
            fontSize="16px"
            color={useColorModeValue("purple", "gray.200")}
            fontWeight="bolder"
          >
            09395060614
          </Text>
        </Link>
      </Flex>

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
        <Text
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap={2}
          color={useColorModeValue("gray.600", "gray.400")}
          fontSize={{ base: "11px", md: "12.5px" }}
        >
          <BsCalendarCheck />
          {today}
        </Text>
        <Flex mx={2}>
          <Popover closeOnBlur={true}>
            <PopoverTrigger>
              <IconButton
                aria-label="open menu"
                size={{ base: "sm", md: "md" }}
                icon={<FiBell />}
                variant="ghost"
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>پیام ها!</PopoverHeader>
              <PopoverBody>
                <List spacing={3}>
                  {userContent &&
                  userContent.notifications &&
                  userContent.notifications.length > 0 ? (
                    userContent.notifications.map((n, i) => (
                      <ListItem key={i}>
                        <Flex
                          gap={4}
                          flexDir={{ base: "column", md: "row" }}
                          alignItems="center"
                          borderBottom={"1px solid rgba(0, 0, 0, 0.1)"}
                          _last={{ borderBottom: "none" }}
                          py={4}
                        >
                          <Box flex={1}>
                            {(() => {
                              const date = moment
                                .from(
                                  new Date(n.time)
                                    .toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    })
                                    .replace(",", ""),
                                  "en"
                                )
                                .locale("fa")
                                .format("YYYY/M/D HH:mm:ss");
                              return (
                                <Flex
                                  fontSize="12px"
                                  gap={1}
                                  alignItems="center"
                                  whiteSpace="nowrap"
                                >
                                  <Icon boxSize={4} as={CiClock2} />
                                  {persianTools.timeAgo(date)}
                                </Flex>
                              );
                            })()}
                          </Box>
                          <Box flex={2} fontSize="13px">
                            {n.message}
                          </Box>
                        </Flex>
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>پیام جدیدی موجود نیست!</ListItem>
                  )}
                </List>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <DarkModeButton
            colorMode={colorMode}
            toggleColorMode={toggleColorMode}
          />
        </Flex>

        <Flex alignItems={"center"} zIndex={2}>
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
                  src={
                    avatar && avatar.length > 0
                      ? avatar
                      : "https://s3-alpha-sig.figma.com/img/8b87/d4ec/07e2adaafa5c876cbc7382f809b9bd51?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aDFVBDl3a9HYPxMQKzp-5ENzJXOc~w-4iaafrf2GR3y4KUh1CiV135fHv5sSLdv6DolisHQvUbJIK~ieSYcbJTqjlhz792dhI6pznAqx5k4xub2pW~~PljiBYlqZn3mvA5aT4iAb94G8nvipRjM-jBNKSN0z5f1DiIbqSfdTCwHiEfCdC~pH8jhH~gJR9zju4QgLQPLuUExp3YIiLJxQ3jP90cw7lJOJTCVM5t1R4L5qCAOehWmLfxMrM8XF0TqoPfbJgUqDmz-pNtTfepqNGMFEIIeyURgKS8dEg7mG8zpyl9Q6p0bZwGZJvSic~FR0pwGpmEYolJaSJjgaNNSBAA__"
                  }
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
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ userContent, userAuth: userToken }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState(userContent.user.avatar);

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
      <MobileNav
        userToken={userToken}
        onOpen={onOpen}
        userContent={userContent}
        avatar={avatar}
      />
      {/* <Box mr={{ base: 0, md: 60 }} className="flex-grow" id="test"> */}
      <Flex
        mr={{ base: 0, md: 60 }}
        flexDir={"column"}
        justifyContent={"space-between"}
        className="min-h-[calc(100vh-80px)] flex-grow"
      >
        <Outlet
          context={{
            userToken,
            userContent,
            setAvatar,
          }}
        />
        <Footer userContent={userContent} />
      </Flex>
      {/* </Box> */}
    </Box>
  );
};

export default SidebarWithHeader;
