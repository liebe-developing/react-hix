import {
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Input,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react';

import { Search } from '../constants/icons';
import { UserList } from '../components';


const Message = ({ text, actor }) => {
    return (
        <Flex
            p={4}
            bg={actor === 'user' ? 'blue.500' : 'gray.100'}
            color={actor === 'user' ? 'white' : 'gray.600'}
            borderRadius="lg"
            w="fit-content"
            alignSelf={actor === 'user' ? 'flex-end' : 'flex-start'}
        >
            <Text>{text}</Text>
        </Flex>
    );
};

export function Chats() {
    return (
        <Flex h="100vh" py={12}

            flexDirection={{ base: "column", lg: "row" }}
            gap="30px"
        >
            <Flex 
            flexDirection="column"
            h={{base:"95%"}}
            >
                <div className='w-[95%] shadow-xl flex flex-row-reverse'>
                    <Input
                        color='teal'
                        placeholder='سرچ کنید'
                        _placeholder={{ color: 'inherit' }}
                    />
                    <Search className='text-4xl text-white bg-black cursor-pointer' />
                </div>
                {/* <CHATS CONTENT> */}
                <div className='w-[95%] custom-scroll  h-[100%] md:h-full overflow-y-scroll  shadow-xl flex flex-col'>
                      <UserList />  
                      <UserList />  
                      <UserList />  
                      <UserList />  
                      <UserList />  
                      <UserList />  
                      <UserList />  
                      <UserList />  
                      <UserList />  
                      <UserList />  
                </div>
            </Flex>

            <Flex
                className='md:absolute left-1 top-[80px]'
            
                flexDirection="column"
                w={{base:"sm",md: "xl",lg:"3xl"}}
                h="full"
                borderWidth="1px"
                mt="5px"
                roundedTop="lg"
                rounded="10px"
            >
                <HStack p={4} bg="blue.500">
                    <Heading size="lg" width="100%">
                        <Flex>
                            <Box p='1' color="white">
                                چت با کاربره
                            </Box>
                            <Spacer />
                            <Box p='1'>
                                <Flex>
                                    <Badge ml='1' height="20px" colorScheme='green'>
                                        پیام جدید
                                    </Badge>
                                    <img src="avatar.webp" alt="not-found" width={50} />
                                </Flex>

                            </Box>
                        </Flex>
                    </Heading>
                </HStack>

                <Stack
                    px={4}
                    py={8}
                    overflow="auto"
                    flex={1}
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#d5e3f7',
                            borderRadius: '24px',
                        },
                    }}
                >
                    <Message text="Hi" actor="user" />
                    <Message text="How may I help you?" actor="bot" />
                    <Message text="Hi" actor="user" />
                    <Message text="How may I help you?" actor="bot" />
                    <Message text="Hi" actor="user" />
                    <Message text="How may I help you?" actor="bot" />
                    <Message text="Hi" actor="user" />
                    <Message text="How may I help you?" actor="bot" />
                </Stack>

                <HStack p={4} bg="gray.100">
                    <Input bg="white" placeholder="Enter your text" />
                    <Button colorScheme="blue">Send</Button>
                </HStack>
            </Flex>
            <Box>

            </Box>
        </Flex>
    );
}

export default Chats;