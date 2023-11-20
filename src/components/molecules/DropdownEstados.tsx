import { Select } from "@chakra-ui/react";
import { useEstadosContext } from "../../hooks/context/EstadosContext";

export default function DropdownEstados() {
    const { estados } = useEstadosContext();

  return (
    <Select placeholder="Selecione o Estado">
      {estados.map((estado) => (
        <option key={estado} value={estado}>
            {estado}
        </option>
      ))}
    </Select>
  );
}
