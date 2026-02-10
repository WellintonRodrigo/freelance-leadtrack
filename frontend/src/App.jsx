import { useEffect, useState } from 'react';
import api from './services/api';
import { CheckCircle, Trash2, User } from 'lucide-react';
import { ResumoCards } from './components/ResumoCards';
import { TabelaLeads } from './components/TabelaLeads';
import { FormularioLeads } from './components/FormularioLeads';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() {
  const [leads, setLeads] = useState([]);

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
    toast.info("Status atualizado!");
    carregarLeads(); // Atualiza a tabela com o novo status
  } catch (error) {
    
    const msgErrStatus = error.response?.data?.error;

    toast.error(`Erro ao atualizar status: ${msgErrStatus}`);
  }
};

  // Função para excluir um lead
const handleDelete = async (id) => {
  if (window.confirm("Deseja realmente excluir este lead?")) {
    try {
      await api.delete(`/leads/${id}`);
      toast.warn('Lead removido!');
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
      
     <ResumoCards leads={leads} />

     <FormularioLeads carregarLeads={carregarLeads} />

     <TabelaLeads leads={leads} handleStatus={handleStatus} handleDelete={handleDelete} />

     <ToastContainer position='bottom-right' theme='dark' />
    </>
  );
}

export default App;