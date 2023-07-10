import React from 'react'
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';

function Login() {
  let nevigate = useNavigate();
  const [message, setmessage] = useState("enter your email");
  const messageupdate=(json)=>{
    setmessage(json.Message);
  }
  const [credential , setcredential] = useState({email:"",password:""})
        const changehandler = (e) =>{
               setcredential({...credential, [e.target.name]: e.target.value});
        }   
      const handlesub = async (e)=>{
         e.preventDefault();
         const response = await fetch("http://localhost:5000/api/loginUser",{
          method: 'POST', // Using POST request to create a new resource in the database
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', 
              body:JSON.stringify({email:credential.email,password:credential.password})
              
         })
         const json = await response.json();
         console.log(json);
         if(!json.success){
           alert("enter valid credentials")
          }
         if(json.success){
          localStorage.setItem("authToken",json.token); 
          console.log(localStorage.getItem("authToken"));
          nevigate("/")
          }
         messageupdate(json);
    }
  return (
    <>
     <div className="container">
     <form onSubmit={handlesub} multipart="urlencoded">
  
 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credential.email} onChange={changehandler}/>
    <div id="emailHelp" className="form-text">{message}</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credential.password} onChange={changehandler}/>
  </div>
  
  <button type="submit" className="m-3 btn btn-success">Login</button>
  <Link to={"/createuser"} className="m-3 btn btn-danger" >Sign-Up</Link>
</form>
</div>

    </>
      

  )
}

export default Login
