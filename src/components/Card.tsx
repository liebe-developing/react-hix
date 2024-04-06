import {
    Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Flex, Table,
} from '@chakra-ui/react'
import React from 'react'

function CardeCom({ title, caption, button, img }) {
    return (
        <Card>
            <CardHeader>
                <Heading size='md'>{title}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{caption}</Text>
            </CardBody>
            <CardFooter>
                <Button>{button}</Button>
            </CardFooter>
        </Card>
    )
}

export default CardeCom
