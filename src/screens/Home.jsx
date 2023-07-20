import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

function Home() {

    const [search, setSearch] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        setFoodItems(response[0]);
        setFoodCategory(response[1]);
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <div>
            <Navbar />
            {/* Carousel Component with Search Bar functionality */}
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div action="/" className="d-flex justify-content-center">
                            <input type="search" className="form-control me-2" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {
                                setSearch(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?momo" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container m-3">
                {
                    (foodCategory !== []) ?
                        foodCategory.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>

                                    <hr />

                                    {(foodItems !== []) ?
                                        foodItems.filter((itemData) =>
                                            (itemData.CategoryName === data.CategoryName) &&
                                            (itemData.name.toLowerCase().includes(search.toLowerCase()))
                                        ).map((filteredItems) => {
                                            return (
                                                <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card
                                                        finalPrice={filteredItems.options[1]}
                                                        foodItem={filteredItems}
                                                        options={filteredItems.options[0]}
                                                    />
                                                </div>
                                            )
                                        }) : null}
                                </div>
                            )
                        }) : null
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home
