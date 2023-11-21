import { DadosFormulario } from "../../components/atoms/interfaces/DadosFormulario";
import { api } from "../apiService";

export default class PessoaService {
  createPessoa = async (pessoaData: DadosFormulario) => {
    const response = await api.post("/pessoa", pessoaData);
    return response.data;
  };

  getAllLocais = async () => {
    const response = await api.get("/pessoa");
    return response.data;
  };

  getPessoa = async (pessoaId: string) => {
    const response = await api.get(`/pessoa/${pessoaId}`);
    return response.data;
  };

  updatePessoa = async (pessoaId: string, updatedData: DadosFormulario) => {
    const response = await api.patch(`/pessoa/${pessoaId}`, updatedData);
    return response.data;
  };

  deletePessoa = async (pessoaId: string) => {
    const response = await api.delete(`/pessoa/${pessoaId}`);
    return response.data;
  };
}
