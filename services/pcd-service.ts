import axios from 'axios';

export const getDeficiencia = async () => {
    try {
        const response = await axios.get('http://localhost:3333/deficiencia');
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar pcd: ${error}`);
    }
};

