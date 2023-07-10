import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function SignUP() {
  // const [name , setname] = useState("");
  // const [email , setemail] = useState("");
  // const [password , setpassword] = useState("");
  // const [geolocation , setlocation] = useState("Bhopal");
  const Navigate = useNavigate();
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changehandler = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handlesub = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createUser", {
      method: "POST", // Using POST request to create a new resource in the database
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer",
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      alert("Register Successfull");
      Navigate("/login");
    } else {
      alert("Enter Valid Crediantial");
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handlesub} multipart="urlencoded">
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="taxt"
              className="form-control"
              name="name"
              value={credential.name}
              onChange={changehandler}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credential.email}
              onChange={changehandler}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credential.password}
              onChange={changehandler}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to={"/login"} className="m-3 btn btn-danger">
            already a user
          </Link>
        </form>
      </div>
      <h1>
        {credential.name} , {credential.geolocation} ,{credential.email} ,{" "}
        {credential.password}
      </h1>
    </>
  );
}

export default SignUP;
