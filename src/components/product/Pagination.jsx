import { Button, Flex } from "@chakra-ui/react"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


function Pagination(props) {

    const { currentPage, boxContent, setCurrentPage } = props
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const pageButtons = [];
    for (let i = 1; i <= boxContent; i++) {
        if (Math.abs(i - currentPage) > 3 && Math.abs(i - boxContent) > 3 && Math.abs(i - 1) > 3) {
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
        const firstSplit = pageButtons.indexOf('___');
        const lastSplit = pageButtons.lastIndexOf('___')

        if (firstSplit > 0 && lastSplit > 0) {
            // flash e samte rast
            pageButtons[firstSplit] = <IoIosArrowBack className="mt-3" />
            // flash e samte chap
            pageButtons[lastSplit] = <IoIosArrowBack className="mt-3 inline-flex bg-red-400" />
        }
        else {
            if (firstSplit > 0) {
                if (Math.abs(i - boxContent) <= 3) {
                    // flash e samte rast
                    pageButtons[firstSplit] = <IoIosArrowForward className="mt-3 inline-flex" />
                } else {
                    //flash e samte chap
                    pageButtons[firstSplit] = <IoIosArrowBack className="mt-3 inline-flex" />

                }
            }
            if (lastSplit > 0) {
                // flash e samte chap
                pageButtons[lastSplit] = <IoIosArrowForward className="mt-3 inline-flex " />
            }
        }
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