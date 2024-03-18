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
  database: 'mydatabase'
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

  app.post('/vagas', async (req, res) => {


    const { vaga, descricao, pagamentopj, pagamentoclt, pagamentobtc, homeoffice, sortable,datelimite, obrigatorios, desejaveis,contato,estado_id, deficiencia_id,pcd } = req.body;
    try {

        await pool.query('INSERT INTO vagas (vaga, descricao, pagamentopj, pagamentoclt, pagamentobtc, homeoffice, sortable,datelimite, obrigatorios, desejaveis,contato,estado_id,deficiencia_id, pcd ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
        [vaga, descricao, pagamentopj, pagamentoclt, pagamentobtc, homeoffice,  JSON.stringify(sortable),datelimite, JSON.stringify(obrigatorios), JSON.stringify(desejaveis),contato,estado_id, deficiencia_id,pcd ]);
        res.status(201).json({ message: 'Dados inseridos com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir dados', error: error.toString() });
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

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
