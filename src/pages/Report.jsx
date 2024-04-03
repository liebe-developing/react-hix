import {
    Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Flex, Table,
} from '@chakra-ui/react'
import CardeCom from '../components/Card'

function Report() {
    return (
        <div className="flex flex-col">
            <Flex
                flexWrap="wrap"
                gap="20px"
            >
                <CardeCom title="بیشترین خرید" caption="بیشترین خرید برسی کنید" button="برسی کن" />
                <CardeCom title="محصولات" caption="بیشترین محصولات برسی کنید" button="برسی کن" />
                <CardeCom title="فروش چند هفته قبل!" caption="بیشترین خرید برسی کنید" button="برسی کن" />
                <CardeCom title="خرید چند هفته قبل!" caption="بیشترین خرید برسی کنید" button="برسی کن" />
            </Flex>
            {/* TABEL CONTENT */}
            
            
        </div>
    )
}

export default Report
