//Routing
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

//components
import Header from './components/layout/Header';
import Index from './components/layout/Index';
import Ciudad from './components/layout/ciudad/Ciudad';
import Footer from './components/layout/templates/Footer';
import WhatsappFloatButton from './components/layout/templates/WhatsappFloatButton';
import Admin from './components/admin/Admin';
import NuevaCiudad from './components/admin/NuevaCiudad';
import NuevoCliente from './components/admin/NuevoCliente';
import VerProveedores from './components/admin/Proveedores';
import Actividad from './components/layout/ciudad/Actividad';
import Ciudades from './components/layout/ciudad/Ciudades';
import EditarCliente from './components/admin/EditarCliente';
import EditarCiudad from './components/admin/EditarCiudad';
import EditarImagenesCliente from './components/admin/EditarImagenesCliente';
import Biografia from './components/layout/biografias/Biografia';
import QuienesSomos from './components/layout/biografias/QuienesSomos';
import Institucional from './components/layout/biografias/Institucional';
import Busqueda from './components/layout/Busqueda';
import Actividades from './components/layout/Actividades';
import Login from './components/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import GestionUsuarios from './components/admin/GestionUsuarios';
import GestionCategorias from './components/admin/GestionCategorias';
import GestionBanner from './components/admin/GestionBanner';
import GestionInstitucional from './components/admin/GestionInstitucional';
import GestionConsultas from './components/admin/GestionConsultas';
import FormularioProveedor from './components/layout/FormularioProovedor';
import NotFound from './components/layout/NotFound';
import { LanguageProvider } from './context/LanguageContext';
import LanguageGate from './components/layout/templates/LanguageGate';


function App() {


  return (
    <LanguageProvider>
    <Router>
      <>
        <LanguageGate />
        <Header></Header>
        <main className=''>
          <Routes>
            <Route exact path='/' element={<Index/>}></Route>
            <Route exact path='/ciudad/:id' element={<Ciudad ciudad />}></Route>
            <Route exact path='/ciudades' element={<Ciudades />}></Route>
            <Route exact path='/destinos' element={<Ciudades />}></Route>
            <Route exact path='/actividad/:id' element={<Actividad actividad />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/busqueda' element={<Busqueda />}></Route>
            <Route exact path='/actividades' element={<Actividades />}></Route>
            <Route path="/biografia" element={<Biografia />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/institucional" element={<Institucional />} />
            <Route path="/formulario-proveedor" element={<FormularioProveedor />} />

            {/* Admin */}
            <Route exact path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
            <Route exact path='/admin/usuarios' element={<ProtectedRoute><GestionUsuarios /></ProtectedRoute>}></Route>
            <Route exact path='/admin/banner' element={<ProtectedRoute><GestionBanner /></ProtectedRoute>}></Route>
            <Route exact path='/admin/institucional' element={<ProtectedRoute><GestionInstitucional /></ProtectedRoute>}></Route>
            <Route exact path='/admin/categorias' element={<ProtectedRoute><GestionCategorias /></ProtectedRoute>}></Route>
            <Route exact path='/admin/agregar-ciudad' element={<ProtectedRoute><NuevaCiudad /></ProtectedRoute>}></Route>
            <Route exact path='/admin/agregar-cliente' element={<ProtectedRoute><NuevoCliente /></ProtectedRoute>}></Route>
            <Route exact path='/admin/editar-cliente/:id' element={<ProtectedRoute><EditarCliente /></ProtectedRoute>}></Route>
            <Route exact path='/admin/editar-ciudad/:id' element={<ProtectedRoute><EditarCiudad /></ProtectedRoute>}></Route>
            <Route exact path='/admin/editar-cliente/:id/imagen' element={<ProtectedRoute><EditarImagenesCliente /></ProtectedRoute>}></Route>
            <Route exact path='/admin/ver-proveedores/:ciudadNombre' element={<ProtectedRoute><VerProveedores proveedores/></ProtectedRoute>}></Route>
            <Route exact path='/admin/consultas' element={<ProtectedRoute><GestionConsultas /></ProtectedRoute>}></Route>

            {/* 404 */}
            <Route path='*' element={<NotFound />} />

          </Routes>
        </main>
        <Footer></Footer>
        <WhatsappFloatButton></WhatsappFloatButton>
      </>

    </Router>
    </LanguageProvider>
  )
}

export default App
