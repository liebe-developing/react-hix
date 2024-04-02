import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Flex } from '@chakra-ui/react'

function Report() {
  return (
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
  )
}

export default Report
