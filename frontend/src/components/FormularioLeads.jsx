import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export function FormularioLeads({carregarLeads}) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

async function handleSubmit(e) {
  try{  
  e.preventDefault();
    await api.post('/leads',{nome,email,whatsapp});
    toast.success('Novo lead cadastrado!');
    
    setNome('');
    setEmail('');
    setWhatsapp('');
    carregarLeads();
  } catch (error) {
    const mgserro = error.response?.data?.error;
    toast.error(`Erro ao cadastrar lead: ${mgserro}`);
  }

}

function formatWhastApp(e) {
  let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número 
   // Aplica a máscara apenas se houver números
  if (value.length > 0) {
   
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Formata o DDD: (XX)
    value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Formata o número: (XX) XXXXX-XXXX
  }
  setWhatsapp(value.slice(0, 15));// Limita a 15 caracteres: (99) 99999-9999
};

  
return (
  
    <section className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-slate-300">Novo Cadastro</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input 
          className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required 
        />
        <input 
          className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required 
        />
        <input 
          className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="(00) 00000-0000" value={whatsapp} onChange={formatWhastApp} required 
        />
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer">
          Cadastrar Lead
        </button>
      </form>
    </section>
  
  );
}