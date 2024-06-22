import axios from 'axios';

export const getVagasId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3333/vagas/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar vagas: ${error}`);
    }
};

export const postVagas = async (data) => {
    try {
        const response = await axios.post('http://localhost:3333/vagas', data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao inserir nova vaga: ${error}`);
    }
};




export default getVagasId
