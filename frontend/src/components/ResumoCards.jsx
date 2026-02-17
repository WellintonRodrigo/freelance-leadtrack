import React from 'react';

export function ResumoCards({ leads }) {
  // Lógica para calcular os totais
  const totalLeads = leads.length;
  const pendentes = leads.filter(l => l.status !== 'Finalizado').length;
  const finalizados = leads.filter(l => l.status === 'Finalizado').length;

  return (
  <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-3 mb-10">
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total</p>
        <p className="mt-2 text-3xl font-bold text-white">{totalLeads}</p>
      </div>
      <div className="rounded-xl border-l-4 border-l-amber-500 border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Pendentes</p>
        <p className="mt-2 text-3xl font-bold text-amber-500">{pendentes}</p>
      </div>
      <div className="rounded-xl border-l-4 border-l-green-500 border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Finalizados</p>
        <p className="mt-2 text-3xl font-bold text-green-500">{finalizados}</p>
      </div>
    </div>
  );
}