import {
    Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Flex, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

function Report() {
    return (
        <div className="">
            <Flex
                gap="20px"
            >
                <Card>
                    <CardHeader>
                        <Heading size='md'>بیشترین بازید کننده</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button>View here</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'>عملکرد 3ماه پیش</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button>View here</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'>گزارشات</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button>View here</Button>
                    </CardFooter>
                </Card>
            </Flex>
            {/* TABEL CONTENT */}
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ارتباط ها</Th>
                            <Th>خرید</Th>
                            <Th isNumeric>گزارش ها</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>بینا</Td>
                            <Td>لب تاب</Td>
                            <Td isNumeric>30000</Td>
                        </Tr>
                        <Tr>
                            <Td>فافا</Td>
                            <Td>گوزش</Td>
                            <Td isNumeric></Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Report
