import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import ViaCepProvider from "./hooks/context/ViaCepContext.tsx";
import { EstadosProvider } from "./hooks/context/EstadosContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ViaCepProvider>
      <EstadosProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </EstadosProvider>
    </ViaCepProvider>
  </React.StrictMode>
);
