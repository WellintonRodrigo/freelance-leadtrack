import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Certifique-se de que o caminho está correto
import { toast } from 'react-toastify';

export function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      // Chamada para a rota que já criamos no backend
      await api.post('/register', { nome, email, senha });
      
      toast.success('Usuário criado com sucesso! Faça login.');
      navigate('/login'); // Redireciona para o login após cadastrar
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao cadastrar usuário');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleRegister} className="bg-slate-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
        
        <input 
          type="text" 
          placeholder="Nome Completo"
          className="w-full p-2.5 mb-4 bg-slate-700 rounded border border-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />

        <input 
          type="email" 
          placeholder="E-mail"
          className="w-full p-2.5 mb-4 bg-slate-700 rounded border border-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input 
          type="password" 
          placeholder="Senha"
          className="w-full p-2.5 mb-6 bg-slate-700 rounded border border-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2.5 rounded font-bold transition">
          Cadastrar
        </button>

        <p className="mt-4 text-center text-sm text-slate-400">
          Já tem conta? <a href="/login" className="text-blue-400 hover:underline">Entre aqui</a>
        </p>
      </form>
    </div>
  );
}