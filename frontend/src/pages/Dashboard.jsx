import { useEffect, useState, useRef } from 'react';
import { FormularioLeads } from '../components/FormularioLeads';
import { Busca } from '../components/Busca';
import { TabelaLeads } from '../components/TabelaLeads';
import { ResumoCards } from '../components/ResumoCards';
import { Sidebar } from '../components/Sidebar';
import api from './../services/api';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useNavigate } from 'react-router-dom';

export function Dashboard() {

   const [leads, setLeads] = useState([]);
    const [filtro, setFiltro] = useState('');
    const erroNotificado = useRef(false);
    //const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const userStorage = localStorage.getItem('user');
    const usuario = userStorage ? JSON.parse(userStorage) : null;
  
  async function checkServer() {
    try {
      await api.get('/leads');
      erroNotificado.current = false;
    } catch (error) {
      const msgservererro = error.response?.data?.error;
      if(!erroNotificado.current){
      toast.error(`Erro ao conectar ao servidor: ${msgservererro} `, 
        { toastId:'server-offline', autoClose: 5000 });
        erroNotificado.current = true;
    }
   }
  };
  
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
  async function handleStatus(id) {
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

     /*function handleLogout(){
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/Login');
  }*/

  //Lógica de Filtro: Criamos uma nova lista baseada no que foi digitado

  const leadsFiltrados = leads.filter(lead => 
    lead.nome?.toLowerCase().includes(filtro.toLowerCase()) || 
    lead.email?.toLowerCase().includes(filtro.toLowerCase())
  );

   useEffect(() => {
    let intervaId;

    const fetchLeads = async () => {
      await checkServer();
      await carregarLeads();

      intervaId = setInterval(()=>{
        const token = localStorage.getItem('token');
        if(token){
          checkServer();
        }
      }, 10000);
 };
    fetchLeads();

     return () => {
      if(intervaId){
        clearInterval(intervaId);
        console.log('Intervalo limpo com sucesso!');
      }
    };
  }, []);

  // Se o usuário ainda não foi carregado do localStorage, não renderiza nada
if (!usuario) {
  return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Carregando painel...</div>;
}
    return (
    <div className="flex min-h-screen bg-slate-950">
      {/* 1. O Menu fixo na lateral esquerda */}
      <Sidebar isOpen={isOpen} setIsOpen={setOpen}/>

      {/* 2. O conteúdo principal com margem à esquerda (ml-64) */}
      <main className={`"flex-1 transition-all duration-300 ${isOpen? 'ml-64': 'ml-20'} p-8`}>
        <div className="max-w-6xl mx-auto">
          {/* Aqui entram os seus componentes que já funcionam */}
          <ResumoCards leads={leads} /> {/* Seus cards de Total/Pendentes */}
          
          <div className="mt-8 space-y-6">
            <FormularioLeads aoCadastrar={carregarLeads} /> {/* */}
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <Busca filtro={filtro} setFiltro={setFiltro} /> {/* Seu input de busca */}
              <TabelaLeads 
                leads={leadsFiltrados} 
                handleStatus={handleStatus} 
                handleDelete={handleDelete} 
              /> {/* */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}