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
import { useState, useEffect } from "react";
import Caixa from "../atoms/Caixa";
import { DadosFormulario } from "../atoms/interfaces/DadosFormulario";
import PessoaService from "../../services/PessoaService/PessoaService";
export default function Tabela() {
  const [pessoas, setPessoas] = useState<DadosFormulario[]>([]);

  const pessoaService = new PessoaService();

  useEffect(() => {
    async function buscarPessoas() {
      try {
        await pessoaService.getAllPessoas().then((pessoas) =>
          setPessoas(pessoas)
        );
      } catch (error) {
        console.error("Erro ao obter as reuniões", error);
      }
    }

    buscarPessoas();
  }, []);

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
            {pessoas.map((pessoa, index) => (
                <Tr key={index}>
                  <Td>{pessoa.nomeCompleto}</Td>
                  <Td>{pessoa.cep}</Td>
                  <Td>{pessoa.novoEndereco ? "Sim" : "Não"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Caixa>
    </Flex>
  );
}
