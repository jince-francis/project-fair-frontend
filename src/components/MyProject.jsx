import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Edit from './Edit'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { GetUserProject, removeUserProjectApi } from '../service/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editProjectResponse } from '../context/ContextShare'



function MyProject() {

    const [userProject, setUserProject] = useState([])
    const [removeStatus,setRemoveStatus]=useState([])

    const { addResponse } = useContext(addResponseContext)
    const {editResponse} = useContext(editProjectResponse)


    const getUserProject = async () => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }


            const result = await GetUserProject(reqHeader)
            console.log(result.data);
            setUserProject(result.data)


        }

    }
    console.log(userProject);

    
    
    const handleDelete = async (id) => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await removeUserProjectApi(id, reqHeader)
            console.log(result);
            if (result.status == 200) {
                setRemoveStatus(result)
                alert('Project deleted successfully')
            } else {
                alert('Something went wrong')
            }
            
        }
   
    }
    useEffect(() => {
        getUserProject()
    }, [addResponse,removeStatus,editResponse])


    return (
        <>
            <div className='p-5 shadow'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h1 className='text-success'>My project</h1>
                    <div><AddProject /></div>
                </div>

                {userProject?.length > 0 ?
                    userProject?.map((item) => (
                        <div className='bg-light mt-3 p-3 rounded d-flex justify-content-between align-items-center'>
                            <h3 className=''>{item?.title}</h3>

                            <div className='d-flex'>
                                <Edit project={item}/>

                                <Link to={item?.github} target='_blank'> <FontAwesomeIcon icon={faGithub} className='fa-xl me-4 text-warning' /></Link>
                                <Link to={item?.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='fa-xl me-4 text-success' /></Link>
                                <FontAwesomeIcon icon={faTrash} className='fa-xl me-4 text-danger' onClick={() => handleDelete(item?._id)} />
                            </div>

                        </div>
                    ))

                    :
                    <h3 className='text-center text-warning mt-5'>No project added yet</h3>
                }
            </div>
        </>
    )
}


export default MyProject
