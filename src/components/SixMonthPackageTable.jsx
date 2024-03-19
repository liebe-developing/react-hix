import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
} from "@chakra-ui/react";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";

const SixMonthPackageTable = ({ sixMonthPackage }) => {
  return (
    <TableContainer mt={8}>
      <Table>
        <Thead>
          <Tr bg="#000">
            <Th fontSize="17px" p={"20px"} color="#fff">
              قابلیت
            </Th>
            <Th fontSize="17px" p={"20px"} color="#fff">
              اقتصادی
            </Th>
            <Th fontSize="17px" p={"20px"} color="#fff">
              حرفه ای
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sixMonthPackage.map((item, idx) => (
            <Tr key={idx}>
              <Td>{item.ability}</Td>
              <Td>
                {item.economic.length > 0 ? (
                  item.economic
                ) : !item.economic.length && item.economic === true ? (
                  <Icon
                    as={FaCheckCircle}
                    w="30px"
                    h="30px"
                    borderRadius="50%"
                    fill="#55e655"
                    color="white"
                  />
                ) : (
                  <Icon
                    as={FaMinusCircle}
                    w="30px"
                    h="30px"
                    borderRadius="50%"
                    fill="red"
                    color="white"
                  />
                )}
              </Td>
              <Td>
                {item.professional.length > 0 ? (
                  item.professional
                ) : !item.professional.length && item.professional === true ? (
                  <Icon
                    as={FaCheckCircle}
                    w="30px"
                    h="30px"
                    borderRadius="50%"
                    fill="#55e655"
                    color="white"
                  />
                ) : (
                  <Icon
                    as={FaMinusCircle}
                    w="30px"
                    h="30px"
                    borderRadius="50%"
                    fill="red"
                    color="white"
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SixMonthPackageTable;
