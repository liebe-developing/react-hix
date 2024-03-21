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

const OneMonthPackageTable = ({ oneMonthPackage }) => {
  return (
    <TableContainer mt={8}>
      <Table>
        <Thead>
          <Tr bg="#000">
            <Th fontSize="17px" p={"20px"} color="#fff">
              قابلیت
            </Th>
            <Th fontSize="17px" p={"20px"} color="#fff">
              رایگان
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
          {oneMonthPackage.map((item, idx) => (
            <Tr key={idx}>
              <Td fontSize={{ base: "11px", md: "14px" }}>{item.ability}</Td>
              <Td fontSize={{ base: "11px", md: "14px" }}>
                {item.free.length > 0 ? (
                  item.free
                ) : !item.free.length && item.free === true ? (
                  <Icon
                    as={FaCheckCircle}
                    w={{ base: "25px", md: "30px" }}
                    h={{ base: "25px", md: "30px" }}
                    borderRadius="50%"
                    fill="#55e655"
                    color="white"
                  />
                ) : (
                  <Icon
                    as={FaMinusCircle}
                    w={{ base: "25px", md: "30px" }}
                    h={{ base: "25px", md: "30px" }}
                    borderRadius="50%"
                    fill="red"
                    color="white"
                  />
                )}
              </Td>
              <Td fontSize={{ base: "11px", md: "14px" }}>
                {item.economic.length > 0 ? (
                  item.economic
                ) : !item.economic.length && item.economic === true ? (
                  <Icon
                    as={FaCheckCircle}
                    w={{ base: "25px", md: "30px" }}
                    h={{ base: "25px", md: "30px" }}
                    borderRadius="50%"
                    fill="#55e655"
                    color="white"
                  />
                ) : (
                  <Icon
                    as={FaMinusCircle}
                    w={{ base: "25px", md: "30px" }}
                    h={{ base: "25px", md: "30px" }}
                    borderRadius="50%"
                    fill="red"
                    color="white"
                  />
                )}
              </Td>
              <Td fontSize={{ base: "11px", md: "14px" }}>
                {item.professional.length > 0 ? (
                  item.professional
                ) : !item.professional.length && item.professional === true ? (
                  <Icon
                    as={FaCheckCircle}
                    w={{ base: "25px", md: "30px" }}
                    h={{ base: "25px", md: "30px" }}
                    borderRadius="50%"
                    fill="#55e655"
                    color="white"
                  />
                ) : (
                  <Icon
                    as={FaMinusCircle}
                    w={{ base: "25px", md: "30px" }}
                    h={{ base: "25px", md: "30px" }}
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

export default OneMonthPackageTable;
