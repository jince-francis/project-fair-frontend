
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { HomeProjectApi } from '../service/allApi'
// import photo from '../assets/desg.png'

function Home() {

    const [isLogin, setIsLogin] = useState(false)
    const [homeProject, setHomeProject] = useState([])

    const getHomeProject = async () => {
        const result = await HomeProjectApi()
        setHomeProject(result.data)
    }

    useEffect(() => {
        getHomeProject()

        if (sessionStorage.getItem('token')) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        };
    },[])

    

    return (
        <>
            <div className='bg-success' style={{ height: '100vh' }}>

                <div className="container-fluid">
                    <div className="row p-4 d-flex justify-content-center align-items-center">

                        <div className="col-md-6 mt-5">
                            <h1 className='text-light mt-5' data-aos="fade-up-right">Project Fair</h1>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, necessitar!</p>

                            {isLogin == false ? <Link to={'/login'}>
                                <button className='btn text-light p-1 mt-3'>get started <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                                :
                                <Link to={'/dashboard'}><button className='btn text-light p-1 mt-3'>Manage Projects <FontAwesomeIcon icon={faArrowRight} /></button></Link>}

                        </div>

                        <div className="col-md-6 d-flex justify-content-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/4661/4661361.png" className='w-75 p-5' alt="No image" />
                            {/* <img src={photo} className='w-75 p-5' alt="No image" /> */}
                        </div>

                    </div>
                </div>
            </div>

            {/* Explore our projects */}

            <div>
                <h1 className='text-center mt-5'>Explore our Projects</h1>
                <div className="container">

                    <div className="row mt-5">
                        {
                            homeProject?.map((item) => (
                                <div className="col-md-4"><ProjectCard project={item} /></div>
                            ))
                        }
                    </div>
                </div>
                <Link to={'/projects'} className='text-danger'><h5 className='text-danger text-center mt-5'>See more Projects <FontAwesomeIcon icon={faArrowRight} /></h5></Link>
            </div>
        </>
    )
}

export default Home