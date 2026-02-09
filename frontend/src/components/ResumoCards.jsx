import React from 'react';

export function ResumoCards({ leads }) {
  // Lógica para calcular os totais
  const totalLeads = leads.length;
  const pendentes = leads.filter(l => l.status !== 'Finalizado').length;
  const finalizados = leads.filter(l => l.status === 'Finalizado').length;

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
      <div style={cardStyle}>
        <h3>Total</h3>
        <p style={{ fontSize: '24px', margin: 0 }}>{totalLeads}</p>
      </div>
      
      <div style={{ ...cardStyle, borderLeft: '5px solid #854d0e' }}>
        <h3>Pendentes</h3>
        <p style={{ fontSize: '24px', margin: 0, color: '#854d0e' }}>{pendentes}</p>
      </div>

      <div style={{ ...cardStyle, borderLeft: '5px solid #166534' }}>
        <h3>Finalizados</h3>
        <p style={{ fontSize: '24px', margin: 0, color: '#166534' }}>{finalizados}</p>
      </div>
    </div>
  );
}

// Estilo básico para os cards
const cardStyle = {
  backgroundColor: '#1e1e1e',
  padding: '15px 25px',
  borderRadius: '8px',
  flex: 1,
  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  color: '#fff'
};