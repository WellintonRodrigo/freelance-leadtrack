import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login.jsx';
import { CadastroUsuario } from './pages/CadastroUsuario.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  


return(
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<CadastroUsuario />} />
    <Route 
  path='/dashboard' 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } 
/>
  </Routes>
</BrowserRouter>
)};

export default App;