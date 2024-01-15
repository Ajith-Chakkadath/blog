import { login } from '../../Services/API/userAPI/userAllAPI';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';




function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    email:"",
    password: ""
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const readLoginValue = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(loginDetails);
      setSuccessMessage("Login Success");
      setErrorMessage('');
      const token = response.data.accesstoken;
      console.log(token);
      // Handle token as needed in your authentication flow
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed');
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

                <h3 className="mb-5">Login</h3>
                <form onSubmit={handleSubmit}>

                <div className="form-outline mb-4">
                    <label className="form-label">Username</label>
                    <input type="email" name='username' className="form-control " value={loginDetails.username} onChange={readLoginValue}/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input type="email" name='email' className="form-control " value={loginDetails.email} onChange={readLoginValue}/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input type="password" name='password' className="form-control form-control-lg" value={loginDetails.password} onChange={readLoginValue} />
                  </div>
                  <div className='m-2'>
                    <p>Click to Register <Link to="/register"> Register</Link> </p>
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>

                  
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

export default Login;
