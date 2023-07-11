import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })

        const json = await response.json();
        console.log(json);

        if (!json.success)
            alert("Enter Valid credentials")
        if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            navigate("/");
        }
    }

    const handleChange = async (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>I am a New User</Link>
                </form>
            </div>
        </>
    )
}

export default Login;
