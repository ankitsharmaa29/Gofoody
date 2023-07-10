import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUP from "./screens/SignUP";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/createuser" element={<SignUP />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
