"use client";
import React, { useContext } from "react";
import DataContext from "../Data/DataContext";
import Link from "next/link";
import Image from "next/image";
import styleComplaint from "../style/complaints.module.css";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
const Category = () => {
  const { services, deleteCategory} = useContext(DataContext);

  const handleDelete = (id)=>{
    deleteCategory(id)
  }

  return (
    <>

      <div className={styleComplaint.main}>
        <div className={styleComplaint.heading}>
          <h1>All Category</h1>
        </div>

        <div className={styleComplaint.dataTable}>
          <div className={styleComplaint.search}>
            <div>
              <span>Service Category </span>
            </div>
            <div>

              <button className={styleComplaint.uploadPageBtn}><Link href='/category/createcategory'>Create Category</Link> </button>
            </div>
          </div>
          <hr />

          <div className="filter"></div>

          <div className={styleComplaint.data}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "5%", textAlign: "center" }}>S.NO</th>
                  <th style={{ width: "30%", textAlign: "center" }}>Banner</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Name</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Position</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan="3">No Category Available</td>
                  </tr>
                ) : (
                  services.map((service, index) => {
                    let categoryImage = `http://localhost:5000/categoryicon/${service.categoryImage}`;
                    return (

                      <tr key={index}>
                        <td style={{ width: "5%", textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td style={{ width: "30%", textAlign: "center" }}>
                          <Image src={categoryImage} width={100} height={100} alt="cataegory Image"/>
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          {service.name}
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          {service.position}
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          <button style={{all:'unset', fontSize:'2rem', color:'#001884', cursor:'pointer', marginRight:'20px'}}><Link href={`/category/${service._id}`}><FaEye /></Link></button>
                          <button
                            className={styleComplaint.deleteBtn}
                            onClick={()=>handleDelete(service._id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  );
};

export default Category;
