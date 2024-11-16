import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Menu } from '../componentes/Menu';
import Head from 'next/head';
import ControleEditora from '../classes/controle/ControleEditora';
import ControleLivros from '../classes/controle/ControleLivros';
import { Livro } from '../classes/modelo/Livro';
import '../pages/style.css';

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivros(); 

const LivroDados: React.FC = () => {
  const [opcoes, setOpcoes] = useState<Array<{ value: number; text: string }>>([]);
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const editoras = controleEditora.getEditoras();
    const editorasOpcoes = editoras.map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(editorasOpcoes);
  }, []);

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const livro = new Livro('', codEditora, titulo, resumo, autores.split('\n'));
    controleLivros
      .incluir(livro)
      .then(() => {
        router.push('/LivroLista');
      })
      .catch((error) => {
        alert('Erro ao incluir o livro.');
        console.error('Erro:', error);
      });
  };

  return (
    <div>
      <Head>
        <title>Incluir Livro</title>
      </Head>
      <Menu />
      <main className="container mt-5">
        <h1>Dados do Livro</h1>
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">
              Resumo
            </label>
            <textarea
              id="resumo"
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="codEditora" className="form-label">
              Editora
            </label>
            <select
              id="codEditora"
              className="form-select"
              value={codEditora}
              onChange={tratarCombo}
              required
            >
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="autores" className="form-label">
              Autores (1 por linha)
            </label>
            <textarea
              id="autores"
              className="form-control"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar Dados
          </button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
