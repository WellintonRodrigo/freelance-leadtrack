import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';


export function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const userStorage = localStorage.getItem('user');
  const usuario = userStorage ? JSON.parse(userStorage) : null;

  // Monitora se o sistema está online/offline
  useEffect(() => {
    const checkServer = async()=>{
        try {
            await api.get('/leads');
            setIsOnline(true);
        } catch (err) {
            const msgservererro = err.response?.data?.error;
            toast.error(`Erro ao conectar ao servidor: ${msgservererro} `, )
            setIsOnline(false);
        }
    };
    checkServer();
    const intterval = setInterval(() => {
      checkServer();
    }, 10000);

    return() => clearInterval(intterval)
    
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col z-50 
      ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Topo: Logo e Botão de Encolher */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800 h-20">
        {isOpen && <h1 className="text-xl font-bold text-blue-500 tracking-tighter">LeadTrack</h1>}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 mx-auto transition-colors"
        >
          {/* Ícone de Menu (Hambúrguer) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Perfil Simplificado */}
      <div className="p-4 flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 min-w-[40px] bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
          {usuario?.nome?.charAt(0).toUpperCase()}
        </div>
        {isOpen && (
          <div className="truncate">
            <p className="text-sm font-medium text-slate-100 truncate">{usuario?.nome}</p>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 mt-4 space-y-2">
        <button className="w-full flex items-center gap-4 px-3 py-3 text-blue-400 bg-blue-500/10 rounded-xl font-medium group transition-all">
          <span className="text-xl">📊</span>
          {isOpen && <span className="truncate">Dashboard</span>}
        </button>
        
        <button className="w-full flex items-center gap-4 px-3 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-medium group transition-all">
          <span className="text-xl">🎯</span>
          {isOpen && <span className="truncate">Funil de Vendas</span>}
        </button>
      </nav>

      {/* Rodapé: Logout */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-semibold"
        >
          <span className="text-xl">🚪</span>
          {isOpen && <span className="truncate text-sm">Sair do Sistema</span>}
        </button>
      </div>
    </aside>
  );
}