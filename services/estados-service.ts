import axios from 'axios';

export const getEstados = async () => {
    try {
        const response = await axios.get('http://localhost:3333/vagas'); // Obter todas as vagas
        const vagas = response.data;

        // Extrair os estados únicos das vagas
        const estados = Array.from(new Set(vagas.flatMap((vaga: any) => vaga.estados.map((estado: any) => estado.nome))));

        return estados;
    } catch (error) {
        console.error(`Erro ao buscar estados: ${error}`);
        return [];
    }
};
