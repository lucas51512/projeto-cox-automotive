import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import Caixa from "../atoms/Caixa";
import DropdownEstados from "../molecules/DropdownEstados";
import { useViaCepContext } from "../../hooks/context/ViaCepContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import Botao from "../atoms/Botao";
import { DadosFormulario } from "../atoms/interfaces/DadosFormulario";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PessoaService from "../../services/PessoaService/PessoaService";

export default function Formulario() {
  const { cepData, loading, error, fetchCepData } = useViaCepContext();
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [valoresFormulario, setValoresFormulario] = useState({
    nomeCompleto: "",
    apelido: "",
    cep: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    estado: "",
    numero: "",
    complemento: "",
    novoEndereco: false,
  });

  const schema = yup.object().shape({
    nomeCompleto: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),
    apelido: yup.string().matches(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),
    cep: yup
      .string()
      .transform((value, originalValue) =>
        originalValue ? originalValue.replace(/\D/g, "") : value
      )
      .matches(/^\d{5}-\d{3}$/, "CEP inválido"),
    cidade: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),
    logradouro: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),
    bairro: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),
    estado: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),
    numero: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),
    complemento: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, "Deve ser alfanumérico"),
    novoEndereco: yup.boolean().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const pessoaService = new PessoaService();

  const cadastrarPessoa = (novaPessoa: DadosFormulario) => {
    pessoaService
      .createPessoa(novaPessoa)
      .then(() => {
        console.log(novaPessoa, "cadastrado com sucesso");
      })
      .catch((error) => {
        console.log(error, "cadastro não realizado");
      });
  };

  const onSubmit: SubmitHandler<DadosFormulario> = async (
    data: DadosFormulario
  ) => {
    if (data.novoEndereco) {
      console.log("Cadastrar novo endereço manualmente:", data);
    } else {
      console.log("Cadastrar pessoa com CEP existente:", data);
      data.cep
        ? await fetchCepData(data.cep)
        : console.log("Cadastre manualmente");
      if (!loading && !error && !cepData) {
        setValoresFormulario((valoresAnteriores) => ({
          ...valoresAnteriores,
          novoEndereco: true,
        }));
        
      }
    }
    cadastrarPessoa(data);
    reset();
  };

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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  {...register("nomeCompleto", { required: true })}
                  type="text"
                  value={valoresFormulario.nomeCompleto}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      nomeCompleto: e.target.value,
                    })
                  }
                />
                {errors.nomeCompleto && <Text color='red'>{errors.nomeCompleto.message}</Text>}
                <FormLabel>Apelido</FormLabel>
                <Input
                  {...register("apelido", { required: true })}
                  type="text"
                  value={valoresFormulario.apelido}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      apelido: e.target.value,
                    })
                  }
                />
                {errors.apelido && <Text color='red'>{errors.apelido.message}</Text>}
                <FormLabel>CEP</FormLabel>
                <Input
                  {...register("cep", { required: true })}
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
                {errors.cep && <Text color='red'>{errors.cep.message}</Text>}
                <FormLabel>Estado</FormLabel>
                <DropdownEstados
                  {...register("estado", { required: true })}
                  estadoSelecionado={estadoSelecionado}
                  onEstadoChange={handleEstadoChange}
                />
                {errors.estado && <Text color='red'>{errors.estado.message}</Text>}
                <FormLabel>Cidade</FormLabel>
                <Input
                  {...register("cidade", { required: true })}
                  type="text"
                  value={valoresFormulario.cidade}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      cidade: e.target.value,
                    })
                  }
                />
                {errors.cidade && <Text color='red'>{errors.cidade.message}</Text>}
                <FormLabel>Logradouro</FormLabel>
                <Input
                  {...register("logradouro", { required: true })}
                  type="text"
                  value={valoresFormulario.logradouro}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      logradouro: e.target.value,
                    })
                  }
                />
                {errors.logradouro && <Text color='red'>{errors.logradouro.message}</Text>}
                <FormLabel>Bairro</FormLabel>
                <Input
                  {...register("bairro", { required: true })}
                  type="text"
                  value={valoresFormulario.bairro}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      bairro: e.target.value,
                    })
                  }
                />
                {errors.bairro && <Text color='red'>{errors.bairro.message}</Text>}
                <FormLabel>Número</FormLabel>
                <Input
                  {...register("numero", { required: true })}
                  type="text"
                  value={valoresFormulario.numero}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      numero: e.target.value,
                    })
                  }
                />
                {errors.numero && <Text color='red'>{errors.numero.message}</Text>}
                <FormLabel>Complemento</FormLabel>
                <Input
                  {...register("complemento", { required: true })}
                  type="text"
                  value={valoresFormulario.complemento}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      complemento: e.target.value,
                    })
                  }
                />
                {errors.complemento && <Text color='red'>{errors.complemento.message}</Text>}
              </FormControl>
              <Flex mt="3%" justify="center">
                <Botao
                  corTexto="#ffffff"
                  mx="10px"
                  type={true}
                  corBotao="#66b4f0"
                  tituloBotao="Salvar"
                />
                <Botao
                  corTexto="#ffffff"
                  mx="10px"
                  type={false}
                  corBotao="#c8032e"
                  tituloBotao="Cancelar"
                />
              </Flex>
            </form>
          </Flex>
        </>
      </Caixa>
    </Flex>
  );
}
