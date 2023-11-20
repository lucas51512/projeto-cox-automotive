import React from 'react';
import { Select } from "@chakra-ui/react";
import { useEstadosContext } from "../../hooks/context/EstadosContext";

interface DropdownEstadosProps {
  estadoSelecionado: string;
  onEstadoChange: (novoEstado: string) => void;
}

export default function DropdownEstados({ estadoSelecionado, onEstadoChange }: DropdownEstadosProps) {
  const { estados } = useEstadosContext();

  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoEstado = event.target.value;
    onEstadoChange(novoEstado);
  };

  return (
    <Select
      placeholder="Selecione o Estado"
      value={estadoSelecionado}
      onChange={handleEstadoChange}
    >
      {estados.map((estado) => (
        <option key={estado} value={estado}>
          {estado}
        </option>
      ))}
    </Select>
  );
}
