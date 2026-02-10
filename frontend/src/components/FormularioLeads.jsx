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
  
return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required />
      <button type="submit">Cadastrar Lead</button>
    </form>
  );
}
const formStyle = {display:'flex', gap:'10px', marginBttom:'30px'}