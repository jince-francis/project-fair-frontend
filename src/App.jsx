import { Route, Routes } from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects'
import Authentication from './pages/Authentication'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './context/ContextShare'

function App() {
  const {loginResponse} = useContext(loginResponseContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/login' element={<Authentication />} />
        <Route path='/register' element={<Authentication register={true} />} />
        <Route path='/dashboard' element={loginResponse?<Dashboard />:<PageNotFound/>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App