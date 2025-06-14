const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 


const app = express();
app.use(cors(
  {
    origin: '*',
  })
);

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '1234',
  database: 'dfds'
});

pool.connect()
     .then(client => {
       console.log('Conectado ao banco de dados!');
       client.release(); 
     })
     .catch(err => {
       console.error('Erro na conexão com o banco de dados:', err);
     });

app.get('/replenishment', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        "Status", 
        "CurrentOperator",
		    "AssignedOperator", 
        "From", 
        "To", 
        "FinishedAt", 
        "ReplenTriggeredBy"
      FROM replenishment
      WHERE 
        "Status" IN ('Available', 'In Progress')
        OR ("Status" = 'Completed' AND "FinishedAt" >= NOW() - INTERVAL '3 hours')
      ORDER BY 
        CASE 
          WHEN "Status" = 'Available' THEN 1
          WHEN "Status" = 'In Progress' THEN 2
          WHEN "Status" = 'Completed' THEN 3
        END
        ,"FinishedAt" DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro na consulta: ', err);
    res.status(500).send('Erro ao buscar dados');
  }
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000')

});
