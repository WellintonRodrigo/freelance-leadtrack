import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();
  const userStorage = localStorage.getItem('user');
  const usuario = userStorage ? JSON.parse(userStorage) : null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0">
      {/* Logo / Nome do Sistema */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-blue-500 tracking-tighter">LeadTrack</h1>
      </div>

      {/* Perfil do Usuário */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
          {usuario?.nome?.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-slate-100 truncate">{usuario?.nome}</p>
          <p className="text-xs text-slate-500">Admin</p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all font-medium bg-slate-800/50 text-blue-400">
          📊 Dashboard
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all font-medium">
          🎯 Funil de Vendas
        </button>
      </nav>

      {/* Botão Sair */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-semibold flex items-center gap-2"
        >
          🚪 Sair do Sistema
        </button>
      </div>
    </aside>
  );
}