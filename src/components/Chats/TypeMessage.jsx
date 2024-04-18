import { Flex, Text } from "@chakra-ui/react";

export const Message = ({ type, content, is_user_message, created_at }) => {

    return (
        <Flex
            p={2}
            my={3}
            bg={is_user_message ? 'blue.500' : 'gray.100'}
            color={is_user_message ? 'white' : 'gray.600'}
            borderRadius="lg"
            w="fit-content"
            alignSelf={is_user_message ? 'flex-end' : 'flex-start'}
        >
            {
                type === 'text' ? (
                    <>
                        <Text className="relative">{content}
                            <span className="text-[9px] absolute -bottom-[27px] -left-1 text-black">{new Date(created_at).toLocaleTimeString("fa-IR", {
                                hour12: false
                            })} </span>
                        </Text>
                    </>
                ) : type === 'form' ? (
                    <div className="flex flex-col">
                        {
                            content.map((item, index) => (
                                <div key={index} className="flex bg-blue-500 shadow-lg w-1/2 items-center gap-4 p-2 odd:bg-red-300 justify-around border-2 border-blue-700 rounded-lg">
                                    <div className="text-md">{item.name}</div>
                                    <div className="text-md">{item.title}</div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        <table class="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 border-2">
                            
                            {
                                content.map((item, index) => (
                                    <div key={index}>
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="py-3 px-6">{item.title}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="odd:bg-white even:bg-slate-50">
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td class="py-4 px-6">{item.title}</td>
                                        </tr>
                                    </tbody>
                                    </div>

                                ))
                            }
                        </table>
                    </div>
                )
            }
        </Flex>
    );
};