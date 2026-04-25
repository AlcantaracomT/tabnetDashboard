import { useEffect, useState } from "react"
import { producaoHospitalar } from "./services/api"
import Filtro from "./components/Filtro";
import KpiCards from "./components/KpiCards";
import TopInternacoes from "./components/TopInternacoes";

function App() {

  const [dados, setDados] = useState([])
  const [atualiza, setAtualiza] = useState({ ano: "", estado: "" })
  const [dadosNovo, setDadosNovo] = useState([])

  useEffect(() => {
    async function buscarDados() {
      const resultado = await producaoHospitalar()
      setDados(resultado)
    }
    buscarDados()
  }, [])

  useEffect(() => {
    async function buscaNova() {
      let novaBusca

      if (!atualiza.ano | !atualiza.estado) {
        novaBusca = await producaoHospitalar("2020", "ba")
      }
      else {
        novaBusca = await producaoHospitalar(atualiza.ano, atualiza.estado)
      }

      setDadosNovo(novaBusca)
    }

    buscaNova()
  }, [atualiza.ano, atualiza.estado])

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Produção Hospitalar</h1>
      <Filtro dados={dados} filtroOk={setAtualiza} />
      <KpiCards dados={dadosNovo} />

      <TopInternacoes dados={dadosNovo}/>

    </div>
  );
}

export default App
