const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
});

//TODO : VAGAS

const JSON_SERVER_URL = 'http://localhost:3333'; // URL do JSON Server

// Rota para buscar todas as vagas do JSON Server
app.get('/vagas', async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/vagas`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados' });
    }
});

// Rota para buscar uma vaga específica do JSON Server
app.get('/vagas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/vagas/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados' });
    }
});

// Rota para criar uma nova vaga no JSON Server
app.post('/vagas', async (req, res) => {
    try {
        const response = await axios.post(`${JSON_SERVER_URL}/vagas`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir dados', error: error.toString() });
    }
});

// Rota para atualizar uma vaga no JSON Server
app.patch('/vagas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.patch(`${JSON_SERVER_URL}/vagas/${id}`, req.body);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar dados', error: error.toString() });
    }
});

// Rota para excluir uma vaga no JSON Server
app.delete('/vagas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.delete(`${JSON_SERVER_URL}/vagas/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir dados', error: error.toString() });
    }
});

//TODO - LOGIN

app.post('/login/:email/token', async (req, res) => {
    const { email } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Email existe' });
        } else {
            res.status(404).json({ message: 'Email não existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error ao verificar email' });
    }
});

let mockToken = '123456'; // token mokado
let tempUser = null; // usuário temporário

app.post('/login/:email/token/language/:languagePort', async (req, res) => {
    const { email } = req.params;

    try {
        await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        tempUser = { email, token: mockToken };
        console.log(tempUser);
        res.status(200).json({ status: 200, message: 'Email confirmed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error confirming email' });
    }
});

app.post('/login/:email', async (req, res) => {
    const { email } = req.params;
    const { password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            if (password === user.password) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.post(`/register/:email/password`, async (req, res) => {
    const { email } = req.params;
    const { token, password, confirmPassword } = req.body;

    let senhasIguais = password === confirmPassword;
    if (!senhasIguais) {
        res.status(400).json({ message: 'As senhas não são iguais' });
        return;
    }

    try {
        if (token !== mockToken) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]);

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'User registered' });
        } else {
            res.status(500).json({ message: 'Error registering user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login/:email/pre-registration', async (req, res) => {
    const { email } = req.params;
    const { option, option1 } = req.body;

    console.log(option);

    try {
        const buscarUsuarioNoBancoDeDados = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (buscarUsuarioNoBancoDeDados.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const user = buscarUsuarioNoBancoDeDados.rows[0];

        const primeiraRespostaUsuario = await pool.query('INSERT INTO user_answers (user_id, question, answer) VALUES ($1, $2, $3)', [user.id, 'Como você nos conheceu?', option]);
        const segundaRespostaUsuario = await pool.query('INSERT INTO user_answers (user_id, question, answer) VALUES ($1, $2, $3)', [user.id, 'Qual seu objetivo?', option1]);

        if (primeiraRespostaUsuario.rowCount > 0 && segundaRespostaUsuario.rowCount > 0) {
            res.status(201).json({ message: 'User answers saved' });
        } else {
            res.status(500).json({ message: 'Error saving user answers' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving user answers' });
    }
});

app.get('/logout/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Logged out successfully' });
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging out' });
    }
});

app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});
