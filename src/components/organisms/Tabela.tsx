import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Caixa from "../atoms/Caixa";
export default function Tabela() {
  return (
    <Flex justify="center">
      <Caixa w="50%" justify="center">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Tabela de Cadastros</TableCaption>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>CEP</Th>
                <Th>Novo Endereço</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Guilherme Brancalhão</Td>
                <Td>19806270</Td>
                <Td>Sim</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Caixa>
    </Flex>
  );
}
