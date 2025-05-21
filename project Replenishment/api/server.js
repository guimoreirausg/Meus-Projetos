const sql = require('mssql');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const config = {
  user: 'seu_usuario',
  password: 'sua_senha',
  server: 'seu_servidor',
  database: 'seu_banco',
  options: { encrypt: false }
};

app.get('/replenishments', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT 
        status, 
        operator, 
        location_from, 
        location_to, 
        finish_at, 
        triggered_by
      FROM Replenishments
      WHERE 
        status IN ('Available', 'In Progress')
        OR (status = 'Completed' AND finish_at >= DATEADD(HOUR, -2, GETDATE()))
      ORDER BY 
        CASE 
          WHEN status = 'Available' THEN 1
          WHEN status = 'In Progress' THEN 2
          WHEN status = 'Completed' THEN 3
        END,
        finish_at DESC;
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar dados');
  }
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
