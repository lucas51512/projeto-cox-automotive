import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cadastro from "./components/pages/Cadastro/Cadastro"
import Listagem from "./components/pages/Listagem/Listagem"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro/>}/>
        <Route path="/listagem" element={<Listagem />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
