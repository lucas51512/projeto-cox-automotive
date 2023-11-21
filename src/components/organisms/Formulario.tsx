import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Caixa from "../atoms/Caixa";
import DropdownEstados from "../molecules/DropdownEstados";
import { useViaCepContext } from "../../hooks/context/ViaCepContext";
import { useEffect, useState } from "react";
import Botao from "../atoms/Botao";
import * as yup from "yup";
import PessoaService from "../../services/PessoaService/PessoaService";
import { useFormik } from "formik";

export default function Formulario() {
  const { cepData, loading, error, fetchCepData } = useViaCepContext();
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const pessoaService = new PessoaService();
  const toast = useToast();

  const schema = yup.object({
    nomeCompleto: yup
      .string()
      .required("Obrigatório")
      .matches(/^[a-zA-Z0-9À-ÿ\s]+$/, "Deve ser alfanumérico"),
    apelido: yup
      .string()
      .matches(/^[a-zA-Z0-9À-ÿ\s]+$/, "Deve ser alfanumérico"),
    cep: yup.string().required(),
    cidade: yup
      .string()
      .required("Obrigatório")
      .matches(/^[a-zA-Z0-9À-ÿ\s]+$/, "Deve ser alfanumérico"),
    logradouro: yup
      .string()
      .required("Obrigatório")
      .matches(/^[a-zA-Z0-9À-ÿ\s]+$/, "Deve ser alfanumérico"),
    bairro: yup
      .string()
      .required("Obrigatório")
      .matches(/^[a-zA-Z0-9À-ÿ\s]+$/, "Deve ser alfanumérico"),
    estado: yup
      .string()
      .required("Obrigatório")
      .matches(/^[a-zA-Z0-9À-ÿ\s]+$/, "Deve ser alfanumérico"),
    numero: yup
      .string()
      .required("Obrigatório")
      .matches(/^[a-zA-Z0-9À-ÿ\s]+$/, "Deve ser alfanumérico"),
    complemento: yup
      .string()
      .required("Obrigatório")
      .matches(/^[a-zA-Z0-9À-ÿ\s]+$/, "Deve ser alfanumérico"),
    novoEndereco: yup.boolean().required(),
  });

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await pessoaService.createPessoa(values);
        toast({
          title: `Pessoa ${values.nomeCompleto} cadastrada com Sucesso!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        formik.resetForm();
      } catch (error) {
        console.log("Erro ao cadastrar a pessoa", error);
      }
    },
  });

  const preencherComCep = () => {
    if (cepData) {
      setEstadoSelecionado(cepData.uf);
      formik.setValues({
        ...formik.values,
        cep: cepData.cep,
        estado: cepData.uf,
        cidade: cepData.localidade,
        logradouro: cepData.logradouro,
        bairro: cepData.bairro,
      });
    }
  };

  useEffect(() => {
    preencherComCep();
  }, [cepData]);

  const handleEstadoChange = (novoEstado: string) => {
    setEstadoSelecionado(novoEstado);
    formik.setFieldValue("estado", novoEstado);
  };

  return (
    <Flex justify="center">
      <Caixa w="50%">
        <>
          <Flex w="100%" flexDir="column">
            <Flex justify="center">
              <Text fontSize="2xl">Cadastro de Pessoa</Text>
            </Flex>
            <form onSubmit={formik.handleSubmit} noValidate>
              <FormControl isInvalid={!!(formik.touched.nomeCompleto && formik.errors.nomeCompleto)}>
                <FormLabel>Nome</FormLabel>
                <Input
                  {...formik.getFieldProps("nomeCompleto")}
                  type="text"
                  onChange={(e) =>
                    formik.setFieldValue("nomeCompleto", e.target.value)
                  }
                />
                {formik.touched.nomeCompleto && formik.errors.nomeCompleto && (
                  <Text color="red">{formik.errors.nomeCompleto}</Text>
                )}
              </FormControl>
              <FormControl isInvalid={!!(formik.touched.apelido && formik.errors.apelido)}>
                <FormLabel>Apelido</FormLabel>
                <Input
                  {...formik.getFieldProps("apelido")}
                  type="text"
                  onChange={(e) =>
                    formik.setFieldValue("apelido", e.target.value)
                  }
                />
                {formik.touched.apelido && formik.errors.apelido && (
                  <Text color="red">{formik.errors.apelido}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!(formik.touched.cep && formik.errors.cep)}>
                <FormLabel>CEP</FormLabel>
                <Input
                  {...formik.getFieldProps("cep")}
                  type="text"
                  onBlur={(e) => {
                    fetchCepData(e.target.value);
                  }}
                  onChange={(e) => formik.setFieldValue("cep", e.target.value)}
                />
                {formik.touched.cep && formik.errors.cep && (
                  <Text color="red">{formik.errors.cep}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!(formik.touched.estado && formik.errors.estado)}>
                <FormLabel>Estado</FormLabel>
                <DropdownEstados
                  {...formik.getFieldProps("estado")}
                  estadoSelecionado={estadoSelecionado}
                  onEstadoChange={handleEstadoChange}
                />
                {formik.touched.estado && formik.errors.estado && (
                  <Text color="red">{formik.errors.estado}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!(formik.touched.cidade && formik.errors.cidade)}>
              <FormLabel>Cidade</FormLabel>
              <Input
                {...formik.getFieldProps("cidade")}
                type="text"
                onChange={(e) => formik.setFieldValue("cidade", e.target.value)}
              />
              {formik.touched.cidade && formik.errors.cidade && (
                <Text color="red">{formik.errors.cidade}</Text>
              )}
              </FormControl>

              <FormControl isInvalid={!!(formik.touched.logradouro && formik.errors.logradouro)}>
              <FormLabel>Logradouro</FormLabel>
              <Input
                {...formik.getFieldProps("logradouro")}
                type="text"
                onChange={(e) =>
                  formik.setFieldValue("logradouro", e.target.value)
                }
              />
              {formik.touched.logradouro && formik.errors.logradouro && (
                <Text color="red">{formik.errors.logradouro}</Text>
              )}
              </FormControl>

              <FormControl isInvalid={!!(formik.touched.bairro && formik.errors.bairro)}>
              <FormLabel>Bairro</FormLabel>
              <Input
                {...formik.getFieldProps("bairro")}
                type="text"
                onChange={(e) => formik.setFieldValue("bairro", e.target.value)}
              />
              {formik.touched.bairro && formik.errors.bairro && (
                <Text color="red">{formik.errors.bairro}</Text>
              )}
              </FormControl>

              <FormControl isInvalid={!!(formik.touched.numero && formik.errors.numero)}>
              <FormLabel>Número</FormLabel>
              <Input
                {...formik.getFieldProps("numero")}
                type="text"
                onChange={(e) => formik.setFieldValue("numero", e.target.value)}
              />
              {formik.touched.numero && formik.errors.numero && (
                <Text color="red">{formik.errors.numero}</Text>
              )}
              </FormControl>

              <FormControl isInvalid={!!(formik.touched.complemento && formik.errors.complemento)}>
              <FormLabel>Complemento</FormLabel>
              <Input
                {...formik.getFieldProps("complemento")}
                type="text"
                onChange={(e) =>
                  formik.setFieldValue("complemento", e.target.value)
                }
              />
              {formik.touched.complemento && formik.errors.complemento && (
                <Text color="red">{formik.errors.complemento}</Text>
              )}
              </FormControl>

              <Flex mt="3%" justify="center">
                <Button mx="10px" type="submit" bgColor="#66b4f0" color="white">
                  Cadastrar
                </Button>
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
