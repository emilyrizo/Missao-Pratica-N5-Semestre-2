const express = require('express');
const router = express.Router();
const Livro = require('../modelo/livro-schema');

router.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.json(livros);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/livros', async (req, res) => {
    const livro = new Livro({
        titulo: req.body.titulo,
        codEditora: req.body.codEditora,
        resumo: req.body.resumo,
        autores: req.body.autores,
    });

    try {
        const novoLivro = await livro.save();
        res.status(201).json(novoLivro);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/livros/:id', async (req, res) => {
    try {
        await Livro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Livro deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
