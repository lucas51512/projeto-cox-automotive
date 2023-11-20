import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface EstadosContextProps {
  estados: string[];
}

const EstadosContext = createContext<EstadosContextProps | undefined>(undefined);

export const useEstadosContext = () => {
  const context = useContext(EstadosContext);
  if (!context) {
    throw new Error('useEstadosContext deve ser utilizado com o EstadosProvider');
  }
  return context;
};

interface EstadosProviderProps {
    children: ReactNode;
}

export function EstadosProvider({ children }: EstadosProviderProps) {
  const [estados, setEstados] = useState<string[]>([]);

  useEffect(() => {
    const estadosFixos = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    setEstados(estadosFixos);
  }, []);

  const contextValue: EstadosContextProps = {
    estados,
  };

  return <EstadosContext.Provider value={contextValue}>{children}</EstadosContext.Provider>;
}
