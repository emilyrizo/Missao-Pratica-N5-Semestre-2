import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { LinhaLivro } from '../componentes/LinhaLivro';
import { Livro } from '../classes/modelo/Livro';
import ControleLivros from '../classes/controle/ControleLivros';
import '../pages/style.css';

const controleLivros = new ControleLivros();

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    if (!carregado) {
      controleLivros.obterLivros().then((data) => {
        setLivros(data);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = (codigo: string) => {
    controleLivros.excluir(codigo).then((success) => {
      if (success) {
        setCarregado(false);
      }
    });
  };

  return (
    <div>
      <Head>
        <title>Lista de Livros</title>
      </Head>
      <Menu />
      <main className="container mt-4">
        <h1 className="mb-4">Catálogo de Livros</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th className="col-titulo">Título</th>
              <th>Resumo</th>
              <th className="col-autores">Autores</th>
              <th className="col-editora">Editora</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro
                key={index}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
