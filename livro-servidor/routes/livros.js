const express = require('express');
const router = express.Router();
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
    try {
        const livros = await obterLivros();
        res.json(livros);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter livros.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const livro = req.body;
        await incluir(livro);
        res.status(201).json({ message: 'Livro incluído com sucesso!' });
    } catch (err) {
        res.status(400).json({ message: 'Erro ao incluir livro.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await excluir(id);
        res.json({ message: 'Livro excluído com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir livro.' });
    }
});

module.exports = router;
