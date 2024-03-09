"use client";
import { useContext, useEffect, useState } from "react"
import Link from "next/link";
import DataContext from "../../Data/DataContext";
import Image from "next/image";
const Subcategory = ({ params }) => {
  const {fetchSubServices, subServices} = useContext(DataContext)
  
  const clientId = params.subcategory;

  useEffect(()=>{
    fetchSubServices(clientId)
  },[])



  return (
    <>
      <div style={{ height: '100vh' }}>
        <h1>Hello {params.subcategory}</h1>
        {subServices.length > 0 ? (
        <ul>
          {subServices.map(service => {
            const imageUrl = `http://localhost:5000/categoryicon/${service.categoryImage}`;

            return(
            <li key={service._id}>
              {service.name}
              <button>
               <Link href={`/services/${service._id}`}>Click</Link> </button>

               <Image src={imageUrl} width={100} height={100} alt={service.name}/>
            </li>
            );
          })}
        </ul>
      ) : (
        <p>No product categories available</p>
      )}
      <button><Link href={`/services/createcategory/${clientId}`}>Add Subcategory</Link></button>
      </div>

    </>
  )
}

export default Subcategory;
