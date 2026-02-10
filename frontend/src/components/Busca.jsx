import React from "react";

export function Busca({filtro, setFiltro}){
    return(
        <div className="mb-6"> 
            <input
            type="text"
            placeholder="Buscar por nome ou email"
            value={filtro}
            onChange={(e)=> setFiltro(e.target.value)}
            style={buscaStyle}
            />
        </div>
    );
}
const buscaStyle = {
    width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #444',
  backgroundColor: '#1e1e1e',
  color: 'white',
  fontSize: '16px'    
 };