import axios from 'axios';

const getVagas = async () => {
    const response = await axios.get('http://localhost:3333/vagas');
    return response.data;
};

export default getVagas
