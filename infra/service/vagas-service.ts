import axios from 'axios';

const getVagas = async () => {
    try {
        const response = await axios.get('http://localhost:3333/vagas');
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

export const deleteVagas = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3333/vagas/${id}`,);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar vaga: ${error}`);
    }
};

export const editarVagas = async (id) => {
    try {
        const response = await axios.patch(`http://localhost:3333/vagas/${id}`,);
        return response.data;
    } catch (error) {
        console.error(`Erro ao editar vaga: ${error}`);
    }
};


export const getEstados = async () => {
    try {
        const response = await axios.get('http://localhost:3333/estados');
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar estados: ${error}`);
    }
};

export const getDeficiencia = async () => {
    try {
        const response = await axios.get('http://localhost:3333/deficiencia');
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar pcd: ${error}`);
    }
};




export default getVagas
