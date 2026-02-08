import { useEffect, useState } from 'react';
import api from './services/api';
import { CheckCircle, Trash2, User } from 'lucide-react';

function App() {
  const [leads, setLeads] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleAddLead = async(e) =>{
    e.preventDefault();
    try{
      await api.post('/leads',{nome,email,whatsapp});
      alert("Lead adicionado com sucesso!");
      
      // Limpar os campos do formulário
      setNome('');
      setEmail('');
      setWhatsapp('');

      // Atualiza a tabela automaticamente
      carregarLeads();
    }catch(error){
      const msgErro = error.response?.data?.error;
      alert(`Erro ao adicionar lead: ${msgErro}`);
    }
  };

  // Função para buscar leads da API
  const carregarLeads = async () => {
    try {
      const resposta = await api.get('/leads');
      setLeads(resposta.data);
      console.log('Dados da API:' ,resposta.data);
      if(Array.isArray(resposta.data)){
        setLeads(resposta.data);
      }
    } catch (error) {
      console.error("Erro ao buscar leads:", error);
    }
  };
  // Função para mudar o status para Finalizado
const handleStatus = async (id) => {
  try {
    await api.patch(`/leads/${id}`, { status: "Finalizado" });
    carregarLeads(); // Atualiza a tabela com o novo status
  } catch (error) {
    
    const msgErrStatus = error.response?.data?.error;

    alert(`Erro ao atualizar status: ${msgErrStatus}`);
  }
};

  // Função para excluir um lead
const handleDelete = async (id) => {
  if (window.confirm("Deseja realmente excluir este lead?")) {
    try {
      await api.delete(`/leads/${id}`);
      carregarLeads(); // Recarrega a lista automaticamente
    } catch (error) {

      const msgErroDelete = error.response?.data?.error;

      alert(`Erro ao excluir lead: ${msgErroDelete}`);
    
    }
  }
};

  useEffect(() => {
    const fetchLeads = async () => {
    await carregarLeads();
    };
    fetchLeads();
  }, []);

  return (

     <>
      <h1>Dashboard de Leads</h1>
      
     <form onSubmit={handleAddLead} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
  <input 
    placeholder="Nome" 
    value={nome} 
    onChange={e => setNome(e.target.value)} 
    style={{ padding: '8px' }}
  />
  <input 
    placeholder="E-mail" 
    value={email} 
    onChange={e => setEmail(e.target.value)} 
    style={{ padding: '8px' }}
  />
  <input 
    placeholder="WhatsApp" 
    value={whatsapp} 
    onChange={e => setWhatsapp(e.target.value)} 
    style={{ padding: '8px' }}
  />
  <button type="submit" style={{ padding: '8px 20px', cursor: 'pointer', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px' }}>
    Cadastrar Lead
  </button>
</form>

    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#2e2c2c' }}>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id}>
              <td>{lead.nome}</td>
              <td>{lead.email}</td>
              <td style={{color: lead.status==='Finalizado' ? '#2ecc71':'wheat', fontWeight:'bold'}}>{lead.status}</td>
              <td>
                <button onClick={()=>handleStatus(lead.id)}><CheckCircle size={16} /></button>
                <button onClick={()=>handleDelete(lead.id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default App;