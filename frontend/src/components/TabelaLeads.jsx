import React from 'react';

export function TabelaLeads({ leads, handleStatus, handleDelete }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '1px solid #444' }}>
          <th>Nome</th>
          <th>Email</th>
          <th>WhatsApp</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(lead => (
          <tr key={lead.id} style={{ borderBottom: '1px solid #333' }}>
            <td>{lead.nome}</td>
            <td>{lead.email}</td>
            <td>
              <a 
                href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#25D366', textDecoration: 'none', fontWeight: 'bold' }}
              >
                {lead.whatsapp}
              </a>
            </td>
            <td style={{ color: lead.status === 'Finalizado' ? '#166534' : '#854d0e' }}>
              {lead.status}
            </td>
            <td>
              <button onClick={() => handleStatus(lead.id)} title="Finalizar">✅</button>
              <button onClick={() => handleDelete(lead.id)} title="Excluir">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}