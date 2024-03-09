"use client";
import React, { useContext } from "react";
import DataContext from "../Data/DataContext";
import Link from "next/link";
import Image from "next/image";

const Services = () => {
  const { services } = useContext(DataContext);



  return (
    <div style={{ height: '100vh' }}>
      <h1>This is Service</h1>
      {services.length > 0 ? (
        <ul>
         {services.map(service => {
            const imageUrl = `http://localhost:5000/categoryicon/${service.categoryImage}`;
            return (
              <li key={service._id}>
                {service.name}
                <button>
                  <Link href={`/services/${service._id}`}>Click</Link>
                </button>
                {/* Use the imageUrl variable within the map function */}
                <Image src={imageUrl} width={100} height={100} alt={service.name} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No product categories available</p>
      )}

      <button><Link href='/services/createcategory'>Create Category</Link>  </button>
    </div>
  );
};

export default Services;
