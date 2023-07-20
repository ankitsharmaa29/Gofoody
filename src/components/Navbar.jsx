import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("authToken");
        navigate("/");
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">GoFoody</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                                </li>
                                : null
                            }
                        </ul>
                        {(!localStorage.getItem("authToken")) ? <div className="d-flex">
                            <Link className="btn bg-white text-success mx-2" to="/login">Login</Link>

                            <Link className="btn bg-white text-success" to="/createuser">Signup</Link>
                        </div> :
                            <div className='d-flex'>
                                <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                                    My Cart {"  "}
                                    <Badge pill bg="danger"> {data.length} </Badge>
                                </div>

                                {cartView ?
                                    <Modal onClose={() => setCartView(false)} >
                                        <Cart />
                                    </Modal>
                                    : null
                                }

                                <Link className="btn bg-white text-danger" to="/" onClick={handleLogout}>Logout</Link>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
