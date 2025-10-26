const Produto = require('../models/Produto');

// Objeto que exporta todos os métodos relacionados a produtos
const produtoController = {
    // Método para listar todos os produtos
    listarTodos: async (req, res) => {
        const produtos = await Produto.findAll({ order: [['id', 'DESC']] });
        res.render('produtos', { produtos });
    },

    // Método para exibir o formulário de cadastro
    exibirFormularioCadastro: (req, res) => {
        res.render('novo-produto');
    },

    // Método para salvar um novo produto (a validação ocorre no middleware)
    salvarProduto: async (req, res) => {
        const { nome, descricao, preco, quantidade } = req.body;
        await Produto.create({ nome, descricao, preco, quantidade });
        res.redirect('/produtos');
    },

    // Método para exibir o formulário de edição
    exibirFormularioEdicao: async (req, res) => {
        const produto = await Produto.findByPk(req.params.id);
        res.render('editar-produto', { produto });
    },

    // Método para atualizar um produto (a validação ocorre no middleware)
    atualizarProduto: async (req, res) => {
        const { nome, descricao, preco, quantidade } = req.body;
        await Produto.update(
            { nome, descricao, preco, quantidade },
            { where: { id: req.params.id } }
        );
        res.redirect('/produtos');
    },

    // Método para deletar um produto
    deletarProduto: async (req, res) => {
        await Produto.destroy({ where: { id: req.params.id } });
        res.redirect('/produtos');
    }
};

module.exports = produtoController;