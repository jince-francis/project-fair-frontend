import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../service/serviceUrl';
import { ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateUserProjectApi } from '../service/allApi';
import { editProjectResponse } from '../context/ContextShare';


function Edit({ project }) {
    const { setEditResponse } = useContext(editProjectResponse)
    const [show, setShow] = useState(false);
    console.log(project);

    const [preview, setPreview] = useState("")
    const [key, setKey] = useState(0)

    const [projectDetails, setProjectDetails] = useState({
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""

    })
    console.log(projectDetails);

    const handleFile = (e) => {
        console.log(e.target.files);
        setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })

    }


    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])


    const handleCancel = () => {
        setProjectDetails({
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""

        })
        setPreview('')
        if (key == 0) {
            setKey(1)
        } else {
            setKey(0)
        }
    }

    const handleUpdate = async () => {
        const { title, language, github, website, overview, projectImage } = projectDetails
        if (!title || !language || !github || !website || !overview) {
            toast.info(`Fill the form completely`)
        } else {
            // api
            // reqBody
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)

            const token = sessionStorage.getItem("token")

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }

                const result = await updateUserProjectApi(project._id, reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    setEditResponse(result)
                    toast.success('Project Updated successfully')
                    setTimeout(() => {
                        handleClose()
                    }, [2000]);
                } else {
                    handleCancel()
                    toast.error(`Something went wrong`)

                }

            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateUserProjectApi(project._id, reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    setEditResponse(result)
                    toast.success('Project Updated successfully')
                    setTimeout(() => {
                        handleClose()
                    }, [2000]);
                } else {
                    handleCancel()
                    toast.error(`Something went wrong`)

                }
            }
        }

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>


            <FontAwesomeIcon icon={faPenToSquare} className='fa-xl me-4 text-info' onClick={handleShow} />

            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>Edit project details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-6">
                                <label>
                                    <input key={0} onChange={(e) => handleFile(e)} type="file" className='d-none' name="" id="projectImage" />
                                    <img src={preview ? preview : `${serverUrl}/upload/${project.projectImage}`} className='w-100' alt="" />
                                </label>
                            </div>
                            <div className="col-md-6">
                                <input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} placeholder='Title' className='form-control mt-2 mt:md-0' />
                                <input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} placeholder='Language' className='form-control mt-2' />
                                <input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.github} placeholder='Github' className='form-control mt-2' />
                                <input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} placeholder='Website' className='form-control mt-2' />
                                <textarea rows={5} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview} name="" placeholder='Overview' id="" className='w-100 form-control mt-2'></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCancel} className='me-3'>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpdate}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position='top-center' />
        </>
    )
}

export default Edit
