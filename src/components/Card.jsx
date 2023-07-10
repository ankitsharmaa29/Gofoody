import React from 'react'

function Card(props) {
  let options = props.filteritem.options[0];
  let priceOptions = Object.keys(options);
  return (
    <div>
       <div className="card mt-3" style={{width: "18rem" , maxHeight :"360px"}}>
  <img className="card-img-top" src={props.filteritem.img} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{props.filteritem.name}</h5>
    
    <div className='container w-100'> 
     <select className=' h-100 m-2 bg-success'>
        {
          Array.from(Array(6) , (e,i)=>{
            return(
              <option key={i+1} value={i+10}> {i} </option>
            )
          })
        }
     </select>
     <select className='h-100 m-2 bg-success'>
       {
        priceOptions.map((data)=>{
          return <option key={data} value={data}> {data}</option>
        })
       }
      </select>
      <div className='d-inline'>Total price</div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Card
