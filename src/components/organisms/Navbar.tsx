import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Caixa from "../atoms/Caixa";

export default function Narbar() {
  return (
    <Caixa mt="0px" boxShadow="md">
      <Flex w="100%">
        <Text fontSize="lg">Sistema de Cadastro</Text>
        <Flex w="20%" justify='center'>
          <Box mx="3%">
            <Link href="/">
              <Text fontSize='md'>Cadastro</Text>
            </Link>
          </Box>
          <Box mx="3%">
            <Link href="/listagem">
              <Text fontSize='md'>Listagem</Text>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Caixa>
  );
}
