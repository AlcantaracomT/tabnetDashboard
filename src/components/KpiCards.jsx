import styles from "./KpiCards.module.css"

function KpiCards({ dados }) {
    const totalInternacoes = dados.reduce((acc, d) => acc + d.internacoes, 0)

    const valor_total = dados.reduce((acc, d) => acc + d.valor_total, 0)

    const obitos = dados.reduce((acc, d) => acc + d.obitos, 0)

    const taxa_mortalidade = totalInternacoes > 0 ? ((obitos / totalInternacoes)*100).toFixed(2) : 0

    const totalDias = dados.reduce((acc, d) => acc + d.dias_permanencia, 0)
    const dias_permanencia = dados.length > 0 ? (totalDias / dados.length).toFixed(0) : 0

    const valormediointern = totalInternacoes > 0 ? (valor_total / totalInternacoes).toFixed(0) : 0

    const formatar = (numero) =>
        new Intl.NumberFormat("pt-BR").format(numero);

    return (
        <div className={styles.containerPrincipal}>

            <div className={styles.cabecalho}>
                <h2>Estado ({dados[0]?.estado}) Ano - {dados[0]?.ano}</h2>
            </div>

            {dados.length === 0 ? (<p>Carregando...</p>) 
            : (
                <div className={styles.gridCard}>

                    <div className={styles.card}>
                        <span>Internações</span>
                        <strong>{formatar(totalInternacoes)}</strong>
                    </div>

                    <div className={styles.card}>
                        <span>Valor Total</span>
                        <strong>R$ {formatar(valor_total)}</strong>
                    </div>

                    <div className={`${styles.card} ${styles.obitos}`}>
                        <span>Óbitos</span>
                        <strong>{formatar(obitos)}</strong>
                    </div>

                    <div className={`${styles.card} ${styles.taxaMortalidade}`}>
                        <span>Taxa Mortalidade</span>
                        <strong>{taxa_mortalidade}%</strong>
                    </div>

                    <div className={styles.card}>
                        <span>Dias Permanência</span>
                        <strong>{formatar(dias_permanencia)}</strong>
                    </div>

                    <div className={`${styles.card} ${styles.valorMedio}`}>
                        <span>Valor Médio</span>
                        <strong>R$ {formatar(valormediointern)}</strong>
                    </div>

                </div>
            )}
        </div>
    )
}

export default KpiCards