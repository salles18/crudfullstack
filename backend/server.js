// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/dev-niveis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definindo os esquemas do banco de dados (usando Mongoose neste exemplo)
const nivelSchema = new mongoose.Schema({
  nivel: String,
});

const desenvolvedorSchema = new mongoose.Schema({
  nivelId: mongoose.Schema.Types.ObjectId,
  nome: String,
  sexo: String,
  dataNascimento: Date,
  hobby: String,
});

const Nivel = mongoose.model('Nivel', nivelSchema);
const Desenvolvedor = mongoose.model('Desenvolvedor', desenvolvedorSchema);

// Rotas da API
// Listar Níveis
app.get('/api/niveis', async (req, res) => {
  try {
    const niveis = await Nivel.find();
    res.status(200).json(niveis);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cadastrar Nível
app.post('/api/niveis', async (req, res) => {
  const { nivel } = req.body;
  try {
    const novoNivel = new Nivel({ nivel });
    await novoNivel.save();
    res.status(201).json(novoNivel);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Implemente as outras rotas de acordo com a especificação...

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
