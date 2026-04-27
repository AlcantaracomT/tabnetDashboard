import { useState, useMemo } from "react";
import styles from "./Filtro.module.css"

function Filtro({ dados, filtroOk }) {
    const [estado, setEstado] = useState("")
    const [ano, setAno] = useState("")
    const [municipio, setMunicipio] = useState("")
    const [mes, setMes] = useState("1")

    const estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const municipios = useMemo(() => {
        if (!dados || !Array.isArray(dados) || dados.length === 0) {
            return []
        }
        const lista = dados.map(item => item.municipio_nome);
        return [...new Set(lista)].filter(Boolean).sort()
    }, [dados])

    const anos = useMemo(() => {
        const atual = new Date().getFullYear();
        const lista = []
        for (let i = atual; i >= 2008; i--) lista.push(i.toString())
        return lista
    }, [])

    const dispararFiltro = (novoEstado, novoAno, novoMes, novoMun) => {
        filtroOk({ estado: novoEstado, ano: novoAno, mes: novoMes, municipio: novoMun });
    };



    return (
        <div className={styles.container}>

            <div className={styles.campoPesquisa}>
                <label>Estado (UF)</label>
                <select className={styles.select} value={estado} onChange={(e) => {
                    const val = e.target.value
                    setEstado(val)
                    setMunicipio("")
                    dispararFiltro(val, ano, mes, "")
                }}>
                    <option value="">Selecionar</option>
                    {estados.map(e => (
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
            </div>


            <div className={styles.campoPesquisa}>
                <label>Mês</label>
                <select className={styles.select} value={mes} onChange={(e) => {
                    setMes(e.target.value)
                    setMunicipio("")
                    dispararFiltro(estado, ano, e.target.value, "")
                }}>
                    {meses.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>

            <div className={styles.campoPesquisa}>
                <label>Ano</label>
                <select className={styles.select} onChange={(e) => {
                    const val = e.target.value;
                    setAno(val);
                    setMunicipio("")
                    dispararFiltro(estado, val, mes, "")
                }}>
                    <option value="">Todos</option>
                    {anos.map(a => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>
            </div>
            
            <div className={styles.campoPesquisa}>
                <label>Município</label>
                <select
                    className={styles.select} value={municipio} onChange={(e) => {
                        const val = e.target.value;
                        setMunicipio(val);
                        dispararFiltro(estado, ano, mes, val)
                    }}
                    disabled={municipios.length === 0}>
                    <option value="">{municipios.length > 0 ? "Todos os Municípios" : "Carregue UF e Ano..."}</option>
                    {municipios.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>

        </div>
    )


}

export default Filtro