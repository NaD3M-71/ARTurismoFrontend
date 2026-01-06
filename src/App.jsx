


//Routing
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

//components
import Header from './components/layout/Header';
import Index from './components/layout/Index';
import Ciudad from './components/layout/ciudad/Ciudad';
import Footer from './components/layout/templates/Footer';
import Admin from './components/admin/Admin';
import NuevaCiudad from './components/admin/NuevaCiudad';
import NuevoCliente from './components/admin/NuevoCliente';
import VerProveedores from './components/admin/Proveedores';
import Actividad from './components/layout/ciudad/Actividad';
import Ciudades from './components/layout/ciudad/Ciudades';
import EditarCliente from './components/admin/EditarCliente';
import EditarImagenesCliente from './components/admin/EditarImagenesCliente';



function App() {


  return (
    <Router>
      <>
        <Header></Header>
        <main className='container '>
          <Routes>
            <Route exact path='/' element={<Index/>}></Route>
            <Route exact path='/ciudad/:id' element={<Ciudad ciudad />}></Route>
            <Route exact path='/ciudades' element={<Ciudades />}></Route>
            <Route exact path='/actividad/:id' element={<Actividad actividad />}></Route>


            {/* Admin */}
            <Route exact path='/admin' element={<Admin />}></Route>
            <Route exact path='/admin/agregar-ciudad' element={<NuevaCiudad />}></Route>
            <Route exact path='/admin/agregar-cliente' element={<NuevoCliente />}></Route>
            <Route exact path='/admin/editar-cliente/:id' element={<EditarCliente />}></Route>
            <Route exact path='/admin/editar-cliente/:id/imagen' element={<EditarImagenesCliente />}></Route>
            <Route exact path='/admin/ver-proveedores/:ciudadNombre' element={<VerProveedores proveedores/>}></Route>
            

          </Routes>
        </main>
        <Footer></Footer>
      </>

    </Router>
  )
}

export default App
