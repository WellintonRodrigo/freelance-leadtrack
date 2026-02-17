import React from 'react';

export function TabelaLeads({ leads, handleStatus, handleDelete }) {
  return (
   <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800/50">
          <tr>
            <th className="p-4 font-semibold text-slate-300">Nome</th>
            <th className="p-4 font-semibold text-slate-300">Email</th>
            <th className="p-4 font-semibold text-slate-300">WhatsApp</th>
            <th className="p-4 font-semibold text-slate-300">Status</th>
            <th className="p-4 font-semibold text-slate-300 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {(leads||length.leads=== 0) ?(
          <tr>
            <td colSpan='5' className='p-10 text-center text-slate-500 italic'>
              Nenhum lead encontrado.
            </td>
          </tr>
          ):(
          leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 text-slate-300">{lead.nome}</td>
              <td className="p-4 text-slate-400 text-sm">{lead.email}</td>
              <td className="p-4">
                <a href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-green-400 hover:underline font-medium">
                  {lead.whatsapp}
                </a>
              </td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                  lead.status === 'Finalizado' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {lead.status}
                </span>
              </td>
              <td className="p-4 flex justify-center gap-3">
                <button onClick={() => handleStatus(lead.id)} className="p-2 hover:bg-green-500/20 rounded-lg text-green-500 transition-all cursor-pointer">✅</button>
                <button onClick={() => handleDelete(lead.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-all cursor-pointer">🗑️</button>
              </td>
            </tr>
          ))
         )}
      </tbody>
    </table>
    </div>
  );
}