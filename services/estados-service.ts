import axios from 'axios';

export const getEstados = async () => {
    try {
        const response = await axios.get('http://localhost:3333/estados');
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar estados: ${error}`);
    }
};
