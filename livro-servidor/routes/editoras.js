const express = require('express');
const router = express.Router();
const editoras = [
    { codEditora: 1, nome: "Arqueiro" },
    { codEditora: 2, nome: "Companhia das Letras" },
    { codEditora: 3, nome: "Suma" },
];

router.get('/', (req, res) => {
    res.json(editoras);
});

router.get('/:codEditora', (req, res) => {
    const editora = editoras.find(e => e.codEditora === parseInt(req.params.codEditora));
    if (editora) {
        res.json(editora.nome);
    } else {
        res.status(404).json({ message: 'Editora não encontrada!' });
    }
});

module.exports = router;
