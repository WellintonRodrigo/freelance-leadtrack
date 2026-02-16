import { useState } from 'react';
import api from '../services/api'; // Sua configuração do axios
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const Navigate = useNavigate();


  async function handleLogin(e) {
    e.preventDefault();
    setCarregando(true);

    try {
      const response = await api.post('/login', { email, senha });
      const { token, user } = response.data;

      // Guarda o token para manter logado
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(`Bem-vindo, ${user.nome}!`);
     Navigate('/dashboard'); // Função para liberar o acesso ao Dashboard
    } catch (error) {
        const msgErroLogin = error.response?.data?.error;
        toast.error(`Erro ao fazer login: ${msgErroLogin}`);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4">
      <div className="w-full max-w-md bg-slate-900/40 p-8 rounded-2xl border border-slate-800 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Acessar Sistema</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1">E-mail</label>
            <input 
              type="email"
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Senha</label>
            <input 
              type="password"
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <button 
            disabled={carregando} // Bloqueia o botão durante o carregamento
            className={`w-full font-bold py-3 rounded-lg transition-all mt-4 flex items-center justify-center gap-2 ${carregando 
                ? "bg-slate-700 cursor-not-allowed text-slate-400" 
                : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
            }`}
          >
            {carregando ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                Autenticando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}