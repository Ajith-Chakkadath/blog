import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { register } from '../../Services/API/userAPI/userAllAPI';



function Register() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    email: "",
    password: "",
    // cnpassword: "", // Uncomment this line if you want to include password confirmation
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const readLoginValue = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(loginDetails);
      setSuccessMessage("Registration Success");
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Registration failed');
      setSuccessMessage('');
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Register Form</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input type="email" name='username' value={loginDetails.username} className="form-control form-control-lg" onChange={readLoginValue} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input type="email" name='email' value={loginDetails.email} className="form-control form-control-lg" onChange={readLoginValue} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control form-control-lg" name='password' value={loginDetails.password} onChange={readLoginValue}  />
                    <div id="passwordHelpBlock" className="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>
                  </div>

                  {/* <div className="form-outline mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control form-control-lg" name='cnpassword' value={loginDetails.cnpassword} onChange={readLoginValue} />
                  </div> */}

                  <div className='m-2'>
                    <p>Already Have account <Link to="/">Login</Link> </p>
                  </div>

                  <button className="btn btn-primary btn-lg btn-block"  type="submit" >Register</button>
                  {/* {error && <div className='error'>{error}</div>} */}


                  {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>)}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}

export default Register;
