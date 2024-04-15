import { Button, Flex } from "@chakra-ui/react"
import { split } from "postcss/lib/list";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


function Pagination(props) {

    const { currentPage, boxContent, setCurrentPage } = props
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const pageButtons = [];
    for (let i = 1; i <= boxContent; i++) {
        if (Math.abs(i - currentPage) > 1 && Math.abs(i - boxContent) > 1 && Math.abs(i - 1) > 1) {
            if (pageButtons[pageButtons.length - 1] != '___')
                pageButtons.push('___');
            continue;
        }
        pageButtons.push(
            <Button
                key={i}
                variant={currentPage === i ? "solid" : "outline"}
                onClick={() => handlePageChange(i)}
                mr={1}
            >
                {i}
            </Button>
        )
    }

    let count = 0;
    let splits = [];
    pageButtons.forEach((v, i) => {
        if (v === '___') {
            count++;
            splits.push(i);
        }
    });

    if (count == 1) {
        if ((pageButtons.length-1)/2 >= splits[0] && currentPage != 1) {
            pageButtons[splits[0]] = <IoIosArrowForward className="mt-3" />

        }
        else {
            pageButtons[splits[0]] = <IoIosArrowBack className="mt-3" />

        }

    }
    if (count == 2) {
        pageButtons[splits[0]] = <IoIosArrowForward className="mt-3" />
        pageButtons[splits[1]] = <IoIosArrowBack className="mt-3" />
    }

    return (
        <div>
            <Flex mt={3} mr={3} flexWrap="wrap">
                {
                    pageButtons
                }
            </Flex>
        </div>
    )
}

export default Pagination