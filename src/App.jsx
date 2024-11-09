import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './pages/dashboard';
import FormBuilder from './pages/formBuilder';

import './styles/dashboard/dashboard.css'
import './styles/formBuilder/formBuilder.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/formbuilder' element={<FormBuilder />} />
      </Routes>
    </>
  )
}

export default App

