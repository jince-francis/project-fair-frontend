import { faFacebook, faGithub, faInstagram, faLinkedin, faStackOverflow, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className="container-fluid bg-success p-4">
        <div className="row">
            <div className="col-md-4">
                <Link to={'/'} style={{textDecoration:'none'}}><h1 className='text-white mt-4'><FontAwesomeIcon icon={faStackOverflow} /> Project Fair</h1></Link>
                <p style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi, eaque quasi ut eveniet minus voluptates explicabo voluptas voluptate blanditiis inventore id nesciunt doloribus natus laboriosam distinctio atque architecto laudantium molestias.</p>
                </div>

            <div className="col-md-2">
                <h1 className='mt-4 text-light'>Guides</h1>
                <Link to={'/'} style={{textDecoration:'none'}}><p>Home</p></Link>
                <p>Project</p>
                <p>Dashboard</p>
            </div>
            
            <div className="col-md-2">
                <div className='d-md-flex justify-content-center flex-column'>
                    <h1 className='mt-4 text-light'>Links</h1>
                    <p>React</p>
                    <p>React Bootstrap</p>
                    <p>Bootswatch</p>
                </div>
            </div>
            
            <div className="col-md-4">
                <h1 className='mt-4 text-light'>Contact Us</h1>
                <div className='d-flex justify-content-center align-items-center'>
                    <input type="text" placeholder='Email id' name="" id="" className='form-control me-3 rounded' />
                    <button className='btn btn-warning rounded'>Subscribe</button>
                </div>
                   
                   <div className='d-flex justify-content-between mt-4'>
                        <FontAwesomeIcon icon={faInstagram} className='fa-2x text-white' />
                        <FontAwesomeIcon icon={faXTwitter} className='fa-2x text-white' />
                        <FontAwesomeIcon icon={faFacebook} className='fa-2x text-white' />
                        <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-white' />
                        <FontAwesomeIcon icon={faGithub} className='fa-2x text-white' />
                   </div>

               
            </div>

        </div>
      </div>
    </>
  )
}

export default Footer
