import styles from "./KpiCards.module.css"

function KpiCards({ dados, filtros}) {
    const totalInternacoes = dados.reduce((acc, d) => acc + d.internacoes, 0)

    const valor_total = dados.reduce((acc, d) => acc + d.valor_total, 0)

    const valormediointernacoes = totalInternacoes > 0 ? (valor_total / totalInternacoes) : 0
    const somaPonderadaMortalidade = dados.reduce((acc, d) => acc + (d.taxa_mortalidade * d.internacoes), 0);

    const taxa_mortalidade = totalInternacoes > 0 ? (somaPonderadaMortalidade / totalInternacoes).toFixed(2) : 0

    const somaPonderadaPermanencia = dados.reduce((acc, d) => acc + (d.media_permanencia * d.internacoes), 0)
    const dias_permanencia = dados.length > 0 ? (somaPonderadaPermanencia / totalInternacoes).toFixed(1) : 0

    const valormediointern = totalInternacoes > 0 ? (valor_total / totalInternacoes).toFixed(0) : 0

    const formatar = (numero) =>
        new Intl.NumberFormat("pt-BR").format(numero);

    return (
        <div className={styles.containerPrincipal}>

            <div className={styles.cabecalho}>
                <h2>{filtros.municipio ? `Município: ${filtros.municipio}` : `Estado (${filtros.estado})`} |  Mês {filtros.mes} - {filtros.ano}</h2>
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
                        <span>Media Internações</span>
                        <strong>{formatar(valormediointernacoes)}</strong>
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