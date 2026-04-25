import { useEffect, useState } from "react";
import styles from "./Filtro.module.css"

function Filtro({ dados, filtroOk }) {
    const [estado, setEstado] = useState("")
    const [ano, setAno] = useState("")

    const estados = [...new Set(dados.map(d => d.estado))]
    const anos = [...new Set(dados.map(d => d.ano))].sort((a,b) => b-a)


    useEffect(() => {
        let filtragem = dados

        if (estado) {
            filtragem = filtragem.filter(f => f.estado === estado)
        }

        if (ano) {
            filtragem = filtragem.filter(f => f.ano === Number(ano))
        }

        filtroOk({ ano, estado })
    }, [estado, ano, dados])

    return (
        <div className={styles.container}>

            <div className={styles.campoPesquisa}>
                <label>Estado</label>
                <select className={styles.select} onChange={(e) => setEstado(e.target.value)}>
                    <option value="">Todos</option>
                    {estados.map(e => (
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
            </div>

            <div className={styles.campoPesquisa}>
                <label>Ano</label>
                <select className={styles.select} onChange={(e) => setAno(e.target.value)}>
                    <option value="">Todos</option>
                    {anos.map(a => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>
            </div>

        </div>
    )


}

export default Filtro