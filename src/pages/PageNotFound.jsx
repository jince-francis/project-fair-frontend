import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 d-flex justify-content-center align-items-center flex-column" style={{marginTop:'-71px'}}>
                        <img src="https://cdn.svgator.com/images/2024/04/detective-animation-404-error-page.gif" alt="" />
                        <h1 className='text-center'>Looks like your lost!</h1>
                        <h4>The page you're looking is unavailable</h4>
                        <Link to={'/'}><button className='btn btn-success rounded mt-5 mb-4'>Go home</button></Link>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound