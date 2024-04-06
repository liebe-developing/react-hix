export const Message = ({ type, content, is_user_message, created_at }) => {
    return (
        <Flex
            p={4}
            bg={is_user_message ? 'blue.500' : 'gray.100'}
            color={is_user_message ? 'white' : 'gray.600'}
            borderRadius="lg"
            w="fit-content"
            alignSelf={is_user_message ? 'flex-end' : 'flex-start'}
        >
            {
                type === 'text' ? (
                    <>
                        <Text>{content}</Text>
                    </>
                ) : type === 'form' ? (
                    <div>
                        {
                            content.map((item, index) => (
                                <div key={index} className="flex w-1/2 items-center justify-between rounded-lg">
                                    <div className="text-2xl">{item.name}</div>
                                    <div className="text-2xl">{item.title}</div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            
                            {
                                content.map((item, index) => {
                                    <>
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="py-3 px-6">{item.title}</th>
                                            </tr>
                                        </thead>
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td class="py-4 px-6">{item.title}</td>
                                        </tr>
                                    </tbody>
                                    </>

                                })
                            }
                        </table>
                    </div>
                )
            }
        </Flex>
    );
};