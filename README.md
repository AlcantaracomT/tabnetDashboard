# Dashboard Produção Hospitalar (SIH/SUS)

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6B6B)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/activity.svg" alt="Activity Icon" width="100">
</p>

## Live Demo
**Acesse o projeto online:** [https://tabnet-dashboard.vercel.app/](https://tabnet-dashboard.vercel.app/)

---

## Sobre o Projeto

O **Dashboard Produção Hospitalar** é uma interface web interativa e reativa focada na visualização de métricas financeiras e epidemiológicas do Sistema Único de Saúde (SUS). 

Desenvolvido como o *Front-end* oficial para consumir a [TabAPI](https://github.com/AlcantaracomT/tabnetAPI), este painel permite que gestores de saúde, pesquisadores e cidadãos analisem dados do Sistema de Informações Hospitalares (SIH/SUS) de forma intuitiva, sem a necessidade de cruzar planilhas ou lidar com arquivos `.def` legados.

### Principais Funcionalidades

- **Filtros Dinâmicos:** Seleção cruzada por Estado (UF), Ano, Mês de competência e Município específico.
- **KPIs Calculados em Tempo Real:**
  - O sistema utiliza cálculos de **Média Ponderada** no lado do cliente para entregar taxas precisas de Mortalidade e Média de Permanência (evitando distorções estatísticas entre municípios de tamanhos diferentes).
  - Cálculo de Ticket Médio por Internação.
- **Visualização Gráfica:** Gráfico de barras horizontal (*Top 10*) renderizado com foco em performance e responsividade.
- **Feedback Visual:** Estados de carregamento (*Loading*) e tratamento elegante de dados vazios (defasagem de meses do Datasus).

---

## Tecnologias Utilizadas

- **[React](https://react.dev/) + [Vite](https://vitejs.dev/):** Base da aplicação, garantindo componentização e *Hot Module Replacement* (HMR) ultrarrápido durante o desenvolvimento.
- **[Recharts](https://recharts.org/):** Biblioteca baseada em D3.js para plotagem do gráfico de ranking de internações.
- **[Axios](https://axios-http.com/):** Cliente HTTP para consumo seguro da API rest com injeção de Headers (`x-api-key`).
- **[Lucide React](https://lucide.dev/):** Pacote de ícones SVG limpos e modernos.
- **CSS Modules:** Estilização escopada para evitar conflitos de classes entre os componentes.

---

## Como executar localmente

### Pré-requisitos
- Node.js instalado (v18 ou superior).
- Ter a [TabAPI](https://github.com/AlcantaracomT/tabnetAPI) rodando localmente ou hospedada na nuvem.

### 1. Clone o repositório
```bash
git clone [https://github.com/AlcantaracomT/tabnetDashboard.git](https://github.com/AlcantaracomT/tabnetDashboard.git)
cd tabnetDashboard
