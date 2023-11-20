import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Caixa from "../atoms/Caixa";
import DropdownEstados from "../molecules/DropdownEstados";
import { useViaCepContext } from "../../hooks/context/ViaCepContext";

export default function Formulario() {

    // const { cepData, loading, error, fetchCepData } = useViaCepContext(); 

  return (
    <Flex justify="center">
      <Caixa w="50%">
        <>
          <Flex w="100%" flexDir="column">
            <Flex justify='center'>
              <Text fontSize="2xl">Cadastro de Pessoa</Text>
            </Flex>
            <form>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input type="text" />
                <FormLabel>Apelido</FormLabel>
                <Input type="text" />
                <FormLabel>CEP</FormLabel>
                <Input type="text" />
                <FormLabel>Estado</FormLabel>
                <DropdownEstados />
                <FormLabel>Cidade</FormLabel>
                <Input type="text" />
                <FormLabel>Logradouro</FormLabel>
                <Input type="text" />
                <FormLabel>Número</FormLabel>
                <Input type="text" />
                <FormLabel>Complemento</FormLabel>
                <Input />
              </FormControl>
            </form>
          </Flex>
        </>
      </Caixa>
    </Flex>
  );
}
