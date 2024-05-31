import axios from 'axios';

export const getDeficiencia = async () => {
    try {
        const response = await axios.get('http://localhost:3333/vagas'); // Obter todas as vagas
        const vagas = response.data;

        // Extrair os tipos de deficiência únicos das vagas
        const deficiencias = Array.from(new Set(vagas.flatMap((vaga: any) => vaga.deficiencia.map((deficiencia: any) => deficiencia.nome))));

        return deficiencias;
    } catch (error) {
        console.error(`Erro ao buscar tipos de deficiência: ${error}`);
        return [];
    }
};
