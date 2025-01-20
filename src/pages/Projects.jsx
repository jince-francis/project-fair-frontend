import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { AllProjectApi } from '../service/allApi'

function Projects() {
  const [token, setToken] = useState("")
  const [allProject, setAllProject] = useState([])

  const [searchKey, setSearchKey]= useState("")
  

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await AllProjectApi(searchKey, reqHeader)
      // console.log(result.data);
      setAllProject(result.data)

    }
  }

  
  console.log(token);
  console.log(allProject);
  console.log(searchKey);
  
  
  useEffect(()=>{
    getAllProject()
  },[searchKey])

  useEffect(() => {
    getAllProject()
    if (sessionStorage.getItem("token"))
      setToken(sessionStorage.getItem('token'))
  },[])

  return (
    <>
      <div>
        <Header />
        <h3 className='text-center mt-4'>All projects</h3>

        {!token ? <div className="mt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                <img src="https://cdn.dribbble.com/users/8619169/screenshots/16514320/media/0dc828901898c59928c3d69718791941.gif" alt="" className='w-75' />
                <h4>Please <Link to={'/login'} className='text-success'>Login</Link> to see more Projects</h4>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
          :

          <div>
            <div className='mt-5'>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4 d-flex">
                    <input type="text" placeholder='Technologies' className='form-control shadow mb-3 mt-4' onChange={(e)=>setSearchKey(e.target.value)} />
                    <FontAwesomeIcon style={{ color: 'lightgrey', marginTop: '35px', marginLeft: '-30px' }} icon={faMagnifyingGlass} />
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </div>
            </div>

            <div className="container mt-5 p-1">

              <div className="row">
                {allProject?.map((item) => (

                  <div className="col-md-3"><ProjectCard project={item} /></div>
                ))
                }
              </div>

            </div>

          </div>}

      </div>
    </>
  )
}

export default Projects
