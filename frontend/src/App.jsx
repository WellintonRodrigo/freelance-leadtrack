import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login.jsx';
import { CadastroUsuario } from './pages/CadastroUsuario.jsx';
import { Dashboard } from './pages/Dashboard.jsx';


function App() {

return(
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<CadastroUsuario />} />
    <Route path='/dashboard' element={<Dashboard />} />
  </Routes>
</BrowserRouter>
)};

export default App;