const BASE_URL = "http://localhost:8000/"

const headers= {
    "chave": import.meta.env.VITE_API_KEY
}

export async function producaoHospitalar(ano, estado) {

    let ano1 = `&ano=${ano}`
    let estado1 = `&estado=${estado}`

    if(!ano){
        ano1 = ""
        estado1 = ""
    }

    const url = `${BASE_URL}producaoHospitalar?limit=417${ano1}${estado1}`
    const resposta = await fetch(url, {method:"GET", headers: headers})
    if(!resposta.ok){
        throw new Error("Ocorreu um erro ao buscar a API")
    }
    return await resposta.json()
}