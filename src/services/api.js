import axios from 'axios'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'x-api-key': import.meta.env.VITE_API_KEY || 'free-key'
    }
});

export async function producaoHospitalar(ano, uf, mes) {
    const resposta = await api.get(`/sih/`, {
        params: { uf, ano, mes }
    });

    return resposta.data
}