const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    codEditora: { type: Number, required: true },
    resumo: { type: String },
    autores: { type: [String], required: true },
});

const Livro = mongoose.model('Livro', LivroSchema);

module.exports = Livro;
