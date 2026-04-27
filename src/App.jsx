import {  useState, useMemo } from "react"
import { producaoHospitalar } from "./services/api"
import Filtro from "./components/Filtro";
import KpiCards from "./components/KpiCards";
import TopInternacoes from "./components/TopInternacoes";

function App() {

  const [dados, setDados] = useState([])
  const [atualiza, setAtualiza] = useState({ ano: "", estado: "", mes:"1", municipio: "" })
  const [dadosNovo, setDadosNovo] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const carregarDados = async (novosFiltros) => {
    if (!novosFiltros.estado || !novosFiltros.ano || !novosFiltros.mes)
      return

    setCarregando(true)
    try {
      const resposta = await producaoHospitalar(novosFiltros.ano, novosFiltros.estado, novosFiltros.mes);
      setDados(resposta.dados || [])
      setDadosNovo(true)
    } catch (e) {
      console.error("Erro ao buscar dados", e)
    } finally {
      setCarregando(false)
    }
  }

  const dadosFiltradosPorMunicipio = useMemo(() => {
    if (!atualiza.municipio) return dados
    return dados.filter(d => d.municipio_nome === atualiza.municipio)
  }, [dados, atualiza.municipio])



  return (
    <div style={{ padding: '2vw', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Dashboard Produção Hospitalar</h1>
      <Filtro dados={dados} filtroOk={(f) => {
        setAtualiza(f)
        if (f.estado !== atualiza.estado || f.ano !== atualiza.ano || f.mes !== atualiza.mes) {
          carregarDados(f);
        }
      }} />

      {carregando && <p>... Aguarde.</p>}
      {!carregando && dadosNovo && dadosFiltradosPorMunicipio.length > 0 ? (
        <>
          <KpiCards dados={dadosFiltradosPorMunicipio} filtros={atualiza}/>

          <TopInternacoes dados={dadosFiltradosPorMunicipio} filtros={atualiza}/>
        </>
      ) :
        (!carregando && <div style={{ textAlign: 'center', marginTop: 50, color: '#666' }}>
          <p>{dadosNovo ? "Nenhum dado" :"Selecione UF e Ano"}</p>
        </div>
        )}
    </div>
  );
}

export default App
