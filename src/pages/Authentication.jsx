import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, requestApi } from '../service/allApi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginResponseContext } from '../context/ContextShare'

function Authentication({ register }) {
  const {setLoginResponse} = useContext(loginResponseContext)
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails)

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      alert("fill the form")
    } else {
      const result = await requestApi(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success(`Registration successful`)
        setuserDetails({
          username: '',
          email: '',
          password: ''
        })
        navigate("/login")
      } else if (result.status == 406) {
        toast.error(result.response.status)
      }
      else {
        toast.error(`Something went wrong`)
      }

    }
  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('Fill the form completely')
    } else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('Login successfull')
        setLoginResponse(true)

        sessionStorage.setItem('existingUsers',JSON.stringify(result.data.existingUsers))
        sessionStorage.setItem('token',result.data.token)

        setuserDetails({
          username: '',
          email: '',
          password: ''
        })
        setTimeout(()=>{
          navigate("/")

        },1000)
      } else if (result.status == 406) {
        toast.error(result.response.status)
      }
      else {
        toast.error(`Something went wrong`)
      }

    }
  }

  return (
    <>

      <div className='p-5 w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className="container w-75">
          <h3><Link to={'/'} style={{ textDecoration: 'none' }} className='text-warning'><FontAwesomeIcon icon={faArrowLeft} /> BACK HOME</Link></h3>

          <div className="row bg-success p-3">
            <div className="col-md-6 p-4 d-flex justify-content-center align-items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="" className="w-75" />
            </div>

            <div className="col-md-6 p-5 d-flex justify-content-center text-center text-light">

              <form className='w-100'>
                <h4 className='text-center text-light'>PROJECT FAIR</h4>
                {!register ? <h5 className="mb-4">Sign into your Account</h5> :
                  <h5 className="mb-4">Sign Up your Account</h5>}


                {register &&
                  <input type="text" name="" className="form-control mb-3" placeholder="Username" onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} />}

                <input type="text" name="" className="form-control mb-3" placeholder="Email ID" onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} />
                <input type="password" name="" className="form-control mb-3" placeholder="password" onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} />

                {/* register */}

                {!register ?
                  <>
                    <button type='button' className="btn btn-warning w-100" onClick={handleLogin}>LOGIN</button>
                    <p className='mt-3'>New User? click Here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                  </>
                  :
                  <>
                    <button type='button' className="btn btn-warning w-100" onClick={handleRegister}>Register</button>
                    <p className='mt-3'>Already a User? click Here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                  </>
                }


              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position='top-center' autoClose={2000} theme="colored" />

    </>

  )
}

export default Authentication

// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Authentication({ register }) {
//   return (
//     <>
//       <div className='p-5 w-100 d-flex justify-content-center align-items-center flex-column' style={{ height: '100vh' }}>

//         <h3 className='mb-3' style={{ marginLeft: '-1130px' }}>  <Link to={'/'} style={{ textDecoration: 'none' }} className='text-warning' ><FontAwesomeIcon icon={faArrowLeft} /> back home</Link></h3>

//         <div className="container bg-success">
//           <div className="row">
//             <div className="col-md-6 d-flex justify-content-center align-items-center">
//               <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="" className="w-75" />
//             </div>
//             <div className="col-md-6 d-flex justify-content-center align-items-center flex-column text-light">
//               <h4>PROJECT FAIR</h4>
//               <h6 className="mb-4">{register ? 'Sign up your account' : 'Sign into your account'}</h6>
//               {register ? (
//                 <>
//                   <input type="email" name="" id="" className="form-control m-3 w-75" placeholder="Username" />
//                   <input type="email" name="" id="" className="form-control m-3 w-75" placeholder="Email id" />
//                   <input type="password" name="" id="" className="form-control m-3 w-75" placeholder="Password" />
//                   <button type='button' className="btn btn-warning w-75">REGISTER</button>
//                   <p className='mt-3'>Already a user? Click here to <Link to='/login' className='text-light'>Login</Link></p>
//                 </>
//               ) : (
//                 <>
//                   <input type="email" name="" id="" className="form-control m-3 w-75" placeholder="Email id" />
//                   <input type="password" name="" id="" className="form-control m-3 w-75" placeholder="Password" />
//                   <button type='button' className="btn btn-warning w-75">LOGIN</button>
//                   <p className='mt-3'>New user? Click here to <Link to='/register' className='text-light'>Register</Link></p>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Authentication;
