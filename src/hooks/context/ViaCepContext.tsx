import { createContext, useContext, useState, ReactNode } from "react";
import CepService from "../../services/CepService/CepService";

interface ViaCepContextProps {
  cepData: any;
  loading: boolean;
  error: string | null;
  novoEndereco: boolean;
  fetchCepData: (cep: string) => Promise<any>;
}

const ViaCepContext = createContext<ViaCepContextProps | undefined>(undefined);

export const useViaCepContext = () => {
  const context = useContext(ViaCepContext);
  if (!context) {
    throw new Error("useViaCepContexto precisa ser usado com o ViaCepProvider");
  }
  return context;
};

interface ViaCepProviderProps {
  children: ReactNode;
}


export default function ViaCepProvider({ children }: ViaCepProviderProps) {
  const [cepData, setCepData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [novoEndereco, setNovoEndereco] = useState(false);

  const cepService = new CepService();

  const fetchCepData = async (cep: string) => {
    try {
      setLoading(true);
      const endereco = await cepService.getEndereco(cep);

      if (!endereco) {
        setCepData(null);
        setNovoEndereco(true);
      } else {
        setCepData(endereco);
        setNovoEndereco(false);
      }
    } catch (error) {
      console.error("Erro ao obter o Cep:", error);
      setError(`Erro ao obter o Cep ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: ViaCepContextProps = {
    cepData,
    loading,
    error,
    novoEndereco,
    fetchCepData,
  };

  return (
    <ViaCepContext.Provider value={contextValue}>
      {children}
    </ViaCepContext.Provider>
  );
}