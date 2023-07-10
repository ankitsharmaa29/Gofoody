import React, { useState } from 'react'
import { useEffect } from 'react'

import Card from '../components/Card'
import Carousal from '../components/Carousal'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  const [Foodcat  , setFoodcat] = useState([]);
  const [Fooditem , setFooditem] = useState([]);
  const [search  ,setSearch] = useState("");
  const loaddata = async  ()=>{
  let fetchedData = await fetch("http://localhost:5000/api/foodData",
  {
    method: 'POST', // Using POST request to create a new resource in the database
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', 
  });
  fetchedData = await fetchedData.json();
  setFooditem(fetchedData[0]);
  setFoodcat(fetchedData[1]);
}
useEffect(()=>{
  loaddata()
},[]);
  return (
    <div>
        <div><Navbar></Navbar></div>
        <div className='mt-3'>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"cover !important"}}>
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption" style={{"zIndex":"10"}}>
  <div className="form-inline">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{
      setSearch(e.target.value); 
    }}/>
    
  </div>
    </div>

    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300/?pastry" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>
        <div className='container '>
          {
            Foodcat !== [] ? Foodcat.map((data)=>{
            return (<div className='row mb-3'>
            <div key={data._id} className="fs-3 m-3">{data.CategoryName}
            </div>
              <hr/>
              {
                Fooditem !== [] ? 
                Fooditem.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                .map((filteritem)=><div key={filteritem._id} className="col-12 col-md-6 col-lg-3 m-3">
                  <Card filteritem={filteritem}
                   ></Card>
                </div>):""
              }
            </div>)
             }) :
            <div>"fdjaskl"</div>
          }
          
          
       
          
        </div>
       <div><Footer></Footer></div>
    </div>
  )
}
