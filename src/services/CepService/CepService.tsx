import { api } from "../apiService";

export default class CepService {
  getEndereco = async (cep: string) => {
    const response = await api.get(`/viaCep/${cep}`);
    return response.data;
  };

}
