import axios from 'axios';

const getVagas = async () => {
    const response = await axios.get('http://localhost:3333/vagas');
    return response.data;
};

export const postVagas = async (data) => {
    try {
        const response = await axios.post('http://localhost:3333/vagas', data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao fazer POST: ${error}`);
    }
};

export const deleteVagas = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3333/vagas/${id}`,);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar vaga: ${error}`);
    }
};



export default getVagas
