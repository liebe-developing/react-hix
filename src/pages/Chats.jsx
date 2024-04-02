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
        <Flex h="100vh" 
            flexDirection={{ base: "column", lg: "row" }}
            gap="6px"
        >
            
            <Flex
                flexDirection="column"
                h={{ base: "95%" }}
                position="relative"
            >
                <div className="absolute -top-9 md:-top-[83px] text-white px-3 py-1 rounded-lg bg-blue-400">
                    چت با کاربره
                </div>

                <div className='w-[95%] mt-3 lg:mt-0 shadow-xl flex flex-row-reverse'>
                    <Input
                        width={270}
                        color='teal'
                        placeholder='سرچ کنید'
                        _placeholder={{ color: 'inherit' }}
                    />
                    <Search className='text-4xl text-white bg-black cursor-pointer' />
                </div>
                {/* <CHATS CONTENT> */}
                <div className=' custom-scroll  md:h-full overflow-y-scroll  shadow-xl flex flex-col'>
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
                className=' left-1 top-[80px]'

                flexDirection="column"
                w={{ base: "sm", md: "xl", lg: "3xl" }}
                h="full"
                borderWidth="1px"
                mt="5px"
                roundedTop="lg"
                rounded="10px"
            >
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
                    <Message text="سلام" actor="user" />
                    <Message text="میتونم کمکتون کنم؟" actor="bot" />
                    <Message text="بله" actor="user" />
                    <Message text="چی کمکی از دست من بر میاد" actor="bot" />
                </Stack>

                <HStack p={4} bg="gray.100">
                    <Input bg="white" placeholder="Enter your text" />
                    <Button colorScheme="blue">Send</Button>
                </HStack>
            </Flex>

        </Flex>
    );
}

export default Chats;