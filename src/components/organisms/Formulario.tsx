import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Caixa from "../atoms/Caixa";
import DropdownEstados from "../molecules/DropdownEstados";
import { useViaCepContext } from "../../hooks/context/ViaCepContext";
import { useEstadosContext } from "../../hooks/context/EstadosContext";
import { useEffect, useState } from "react";

export default function Formulario() {
  const { cepData, loading, error, fetchCepData } = useViaCepContext();
  const estados = useEstadosContext();
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [valoresFormulario, setValoresFormulario] = useState({
    nomeCompleto: "",
    apelido: "",
    cep: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    numero: "",
    complemento: "",
  });

  const preencherComCep = () => {
    if (cepData) {
      setEstadoSelecionado(cepData.uf);
      setValoresFormulario((valoresAnteriores) => ({
        ...valoresAnteriores,
        estado: estadoSelecionado,
        cidade: cepData.localidade,
        logradouro: cepData.logradouro,
        bairro: cepData.bairro,
      }));
    }
  };

  useEffect(() => {
    preencherComCep();
  }, [cepData]);

  const handleEstadoChange = (novoEstado: string) => {
    setEstadoSelecionado(novoEstado);
  };

  return (
    <Flex justify="center">
      <Caixa w="50%">
        <>
          <Flex w="100%" flexDir="column">
            <Flex justify="center">
              <Text fontSize="2xl">Cadastro de Pessoa</Text>
            </Flex>
            <form>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={valoresFormulario.nomeCompleto}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      nomeCompleto: e.target.value,
                    })
                  }
                />
                <FormLabel>Apelido</FormLabel>
                <Input
                  type="text"
                  value={valoresFormulario.apelido}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      apelido: e.target.value,
                    })
                  }
                />
                <FormLabel>CEP</FormLabel>
                <Input
                  type="text"
                  value={valoresFormulario.cep}
                  onBlur={(e) => {
                    fetchCepData(e.target.value);
                  }}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      cep: e.target.value,
                    })
                  }
                />
                <FormLabel>Estado</FormLabel>
                <DropdownEstados
                  estadoSelecionado={estadoSelecionado}
                  onEstadoChange={handleEstadoChange}
                />
                <FormLabel>Cidade</FormLabel>
                <Input
                  type="text"
                  value={valoresFormulario.cidade}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      cidade: e.target.value,
                    })
                  }
                />
                <FormLabel>Logradouro</FormLabel>
                <Input
                  type="text"
                  value={valoresFormulario.logradouro}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      logradouro: e.target.value,
                    })
                  }
                />
                <FormLabel>Bairro</FormLabel>
                <Input
                  type="text"
                  value={valoresFormulario.bairro}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      bairro: e.target.value,
                    })
                  }
                />
                <FormLabel>Número</FormLabel>
                <Input
                  type="text"
                  value={valoresFormulario.numero}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      numero: e.target.value,
                    })
                  }
                />
                <FormLabel>Complemento</FormLabel>
                <Input
                  type="text"
                  value={valoresFormulario.complemento}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      complemento: e.target.value,
                    })
                  }
                />
              </FormControl>
            </form>
          </Flex>
        </>
      </Caixa>
    </Flex>
  );
}
