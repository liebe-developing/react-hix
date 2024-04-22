
import {
    Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Flex, Table,
} from '@chakra-ui/react'

import { IoChatboxEllipsesOutline } from 'react-icons/io5';

function CardeCom(props) {
    const { title, sum, discount, chst, iconsTitle } = props

    return (
        <Card
            transition="0.30s"
            cursor="pointer"
            _hover={{ shadow: "2xl" }}
            shadow="md"
            display="flex">
            <CardHeader>
                <Heading size='md' display="flex" flexDirection="row-reverse" alignItems="center" justifyContent="space-around">
                    {iconsTitle}
                    <Text borderBottom="1px">{title}</Text>
                </Heading>
            </CardHeader>
            <CardBody>
                <Text>خرید /
                    <span className="font-bold m-4 text-2xl">{sum}</span>
                </Text>
            </CardBody>
            <CardFooter display="flex" gap="10px">
                <IoChatboxEllipsesOutline className='text-2xl font-light inline-flex' />
                <h4>{discount}%  / سال قبل</h4>
            </CardFooter>
        </Card>
    )
}

export default CardeCom
