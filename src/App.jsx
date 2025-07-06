import './App.css'
import ReactDOM from 'react-dom/client';
import Layout from './pages/Layout'
import Home from './pages/Home'
import Plot from './pages/Plot'
import NoPage from './pages/NoPage'
import Load from './pages/Load';
import Calc from './pages/Calc';
import Print from './pages/Print';
import Settings from './pages/Settings';
import Decompose from './pages/Decompose';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Layout id = 'sidebar'/>} >
        <Route index element = {<Home/>} />
        <Route path = 'plot' element = {<Plot/>} />
        <Route path = 'load' element = {<Load/>} />
        <Route path = 'settings' element = {<Settings/>} />
        <Route path = 'calc' element = {<Calc/>} />
        <Route path = 'print' element = {<Print/>} />
        <Route path = 'decompose' element = {<Decompose/>} />
        <Route path = '*' element = {<NoPage/>} /> 
      </Route>
    </Routes>
    </BrowserRouter>

  );
}

export default App
