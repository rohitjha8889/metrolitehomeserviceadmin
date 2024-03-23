"use client";
import React, { useContext, useEffect } from "react";
import DataContext from "../Data/DataContext";
import Link from "next/link";
import Image from "next/image";
import styleComplaint from "../style/complaints.module.css";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Services = () => {
  const { allproducts, deleteProduct } = useContext(DataContext);

  const handleDelete = (id)=>{
    deleteProduct(id)
}


  return (
    <>
      <div className={styleComplaint.main}>
        <div className={styleComplaint.heading}>
          <h1>All Services</h1>
        </div>

        <div className={styleComplaint.dataTable}>
          <div className={styleComplaint.search}>
            <div>
              <span>Available Service</span>
            </div>
            <div>
              <button className={styleComplaint.uploadPageBtn}>
                <Link href="/services/addproduct">Add Product</Link>{" "}
              </button>
            </div>
          </div>
          <hr />

          <div className="filter"></div>

          <div className={styleComplaint.data}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "5%", textAlign: "center" }}>S.NO</th>
                  <th style={{ width: "20%", textAlign: "center" }}>Image</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Name</th>

                  <th style={{ width: "10%", textAlign: "center" }}>Price</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Status</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allproducts.length === 0 ? (
                  <tr>
                    <td colSpan="5">No Service  Available</td>
                  </tr>
                ) : (
                  allproducts.map((product, index) => {
                    let productImage = `http://77.37.47.56:5000/productimage/${product.images[1]}`;
                    return (
                      <tr key={index}>
                        <td style={{ width: "5%", textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td style={{ width: "20%", textAlign: "center" }}>
                          <Image
                            src={productImage}
                            width={200}
                            height={100}
                            alt="Image"
                          />
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          {product.name}
                        </td>

                        <td style={{ width: "10%", textAlign: "center" }}>
                          {product.price}
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          {product.status}
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          <button
                            style={{
                              all: "unset",
                              fontSize: "1.5rem",
                              color: "#001884",
                              cursor: "pointer",
                              marginRight: "10px"
                            }}
                          >
                            <Link href={`/services/${product._id}`}>
                              <FaEye />
                            </Link>
                          </button>

                          {/* <button  style={{
                              all: "unset",
                              fontSize: "1.5rem",
                              color: "#001884",
                              cursor: "pointer",
                              marginRight: "10px"
                            }}>
                              <Link href={{
                                pathname:"/services/updateproduct",
                                query:{
                                  productId:`${product._id}`
                                }
                              }}>
                              
                            <FaEdit/>
                              </Link>
                          </button> */}
                          <button className={styleComplaint.deleteBtn} onClick={()=>handleDelete(product._id)}>
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

export default Services;
