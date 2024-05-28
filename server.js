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

app.get('/vagas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vagas');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados' });
    }
});

app.get('/vagas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM vagas WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados' });
    }
});

app.post('/vagas', async (req, res) => {
    const { vaga, descricao, homeoffice, sortable, datelimite, obrigatorios, desejaveis, estado_id, deficiencia_id, pcd, pagamentopj, pagamentoclt, pagamentobtc, contato } = req.body;
    try {
        await pool.query(
            'INSERT INTO vagas (vaga, descricao, homeoffice, sortable, datelimite, obrigatorios, desejaveis, estado_id, deficiencia_id, pcd, pagamentopj, pagamentoclt, pagamentobtc, contato) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
            [
                vaga,
                descricao,
                homeoffice,
                JSON.stringify(sortable),
                datelimite,
                JSON.stringify(obrigatorios),
                JSON.stringify(desejaveis),
                estado_id,
                deficiencia_id,
                pcd,
                pagamentopj,
                pagamentoclt,
                pagamentobtc,
                contato,
            ]
        );
        res.status(201).json({ message: 'Dados inseridos com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir dados', error: error.toString() });
    }
});

app.patch('/vagas/:id', async (req, res) => {
    const { vaga, descricao, homeoffice, sortable, datelimite, obrigatorios, desejaveis, estado_id, deficiencia_id, pcd, pagamentopj, pagamentoclt, pagamentobtc, contato } = req.body;
    const { id } = req.params;
    try {
        await pool.query(
            'UPDATE vagas SET vaga = $1, descricao = $2, homeoffice = $3, sortable = $4, datelimite = $5, obrigatorios = $6, desejaveis = $7, estado_id = $8, deficiencia_id = $9, pcd = $10, pagamentopj = $11, pagamentoclt = $12, pagamentobtc = $13, contato = $14 WHERE id = $15',
            [
                vaga,
                descricao,
                homeoffice,
                JSON.stringify(sortable),
                datelimite,
                JSON.stringify(obrigatorios),
                JSON.stringify(desejaveis),
                estado_id,
                deficiencia_id,
                pcd,
                pagamentopj,
                pagamentoclt,
                pagamentobtc,
                contato,
                id,
            ]
        );
        res.status(200).json({ message:'Dados atualizados com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar dados', error: error.toString() });
    }
});

app.get('/estados', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM estados');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar estados' });
    }
});

app.get('/deficiencia', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM deficiencia');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar deficiencia' });
    }
});

app.patch('/vagas/:id', async (req, res) => {
    const { id } = req.params;
    const { vagas, descricao, datalimite } = req.body;
    try {
        await pool.query('UPDATE vagas SET vagas = $1, descricao = $2, datalimite = $3 WHERE id = $4', [vagas, descricao, datalimite, id]);
        res.status(200).json({ message: 'Dados atualizados com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar dados' });
    }
});

app.delete('/vagas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM vagas WHERE id = $1', [id]);
        res.status(200).json({ message: 'Dados excluídos com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir dados' });
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
