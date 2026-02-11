import { useEffect, useState, useRef } from 'react';
import api from './services/api';
import { CheckCircle, Trash2, User } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ResumoCards } from './components/ResumoCards';
import { TabelaLeads } from './components/TabelaLeads';
import { FormularioLeads } from './components/FormularioLeads';
import { Busca } from './components/Busca';


function App() {
  const [leads, setLeads] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const erroNotificado = useRef(false);


async function checkServer() {
  try {
    await api.get('/leads');
    setIsOnline(true);
    erroNotificado.current = false;
  } catch (error) {
    const msgservererro = error.response?.data?.error;
    setIsOnline(false);
    if(!erroNotificado.current){
    toast.error(`Erro ao conectar ao servidor: ${msgservererro} `, 
      { toastId:'server-offline', autoClose: 5000 });
      erroNotificado.current = true;
  }
 }
}

  // Função para buscar leads da API
  async function carregarLeads(){
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
async function handleStatus  (id) {
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
async function handleDelete(id){
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
      await checkServer();
      const interval = setInterval(checkServer, 10000);
    await carregarLeads();
    return () => clearInterval(interval);
    };
    fetchLeads();
  }, []);

  //Lógica de Filtro: Criamos uma nova lista baseada no que foi digitado

  const leadsFiltrados = leads.filter(lead => 
    lead.nome.toLowerCase().includes(filtro.toLowerCase()) || 
    lead.email.toLowerCase().includes(filtro.toLowerCase())
  );


  return (

     <div className='min-h-screen bg-slate-950 p8 text-slate-100'>
      <div className='mx-auto max-w-6xl'>
        <header className='mb-10 flex items-center justify-between'> 
      <h1 className="text-4xl font-bold text-green-500 uppercase">
        Dashboard de Leads
        </h1>
        <span className={`rounded-full bg-bg-green-500 px3 py-1 text-sm font-medium text-green-400 border transition-all ${isOnline ? "bg-green-500/10 text-green-400 border-green-500/20" 
  : "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse"
}`}>
          Sistema {isOnline? 'Online ' : 'Offline'}
        </span>
      </header>
     <ResumoCards leads={leads} />

     <FormularioLeads carregarLeads={carregarLeads} />

      <Busca filtro={filtro} setFiltro={setFiltro} />

     <TabelaLeads 
      leads={leadsFiltrados}
      handleStatus={handleStatus}
      handleDelete={handleDelete}
      />

     <ToastContainer position='bottom-right' theme='dark' />
    </div>
    </div>
  );
}

export default App;