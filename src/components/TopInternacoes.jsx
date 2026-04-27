import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import styles from "./TopInternacoes.module.css"

function TopInternacoes({ dados, filtros}) {

  const agrupado = Object.values(
    dados.reduce((acumulaEstados, itemAtual) => {
      if (!acumulaEstados[itemAtual.municipio_nome]) {
        acumulaEstados[itemAtual.municipio_nome] = {
          municipio: itemAtual.municipio_nome,
          internacoes: 0,
        }
      }
      acumulaEstados[itemAtual.municipio_nome].internacoes += itemAtual.internacoes
      return acumulaEstados
    }, {})

  )

  const top10 = agrupado.sort((a, b) => b.internacoes - a.internacoes).slice(0, 10)
  const formatar = (numero) => new Intl.NumberFormat("pt-BR").format(numero)

  return (
    <div className={styles.containerChart}>

      <div className={styles.cabecaChart}>
        <h2>{filtros.municipio ? "Internações no Município" : "Top 10 Internações"}</h2>
        <span>{filtros.estado} • Mês {filtros.mes} • {filtros.ano}</span>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={top10} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
          <XAxis type="number" tickFormatter={(value) => formatar(value)}/>
          <YAxis dataKey="municipio" type="category" width={200} />
          <Tooltip formatter={(value)=> formatar(value)} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}/>
          <Bar dataKey="internacoes" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default TopInternacoes