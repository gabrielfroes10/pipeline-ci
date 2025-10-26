const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
// Importa o middleware de validação
const { validaDadosProduto } = require('../middlewares/produtoMiddleware');

router.get('/', produtoController.listarTodos);
router.get('/novo', produtoController.exibirFormularioCadastro);
router.get('/editar/:id', produtoController.exibirFormularioEdicao);

// Aplica o middleware ANTES de chamar o método do controller
router.post('/add', validaDadosProduto, produtoController.salvarProduto);
router.post('/editar/:id', validaDadosProduto, produtoController.atualizarProduto);

router.post('/deletar/:id', produtoController.deletarProduto);

module.exports = router;