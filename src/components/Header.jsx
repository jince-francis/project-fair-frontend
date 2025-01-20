import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/ContextShare';


function Header() {
  const {setLoginResponse} = useContext(loginResponseContext)
  const [token, setToken] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])
  const handleLogout = () => {
    
    sessionStorage.removeItem("existingUsers")
    sessionStorage.removeItem("token")
    navigate("/")
    setLoginResponse(false)
  }
  return (
    <>
      <Navbar className="bg-success d-flex align-items-center" fixed='top'>
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{ textDecoration: 'none' }}><span className='text-white mt-4'><FontAwesomeIcon icon={faStackOverflow} className='fs-3' /> Project Fair</span></Link>
          </Navbar.Brand>
        </Container>

        {token && <button className='btn btn-warning rounded ms-auto me-3' onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} className='me-2' /> Logout</button>}
      </Navbar>
    </>
  )
}

export default Header