"use client";
import styleComplaint from "../style/complaints.module.css";
import React, { useContext } from 'react';

const Bookings = () => {
  // console.log(dataA)

  return (
    <>
      <div className={styleComplaint.main}>
        <div className={styleComplaint.heading}>
          <h1>All Complaint</h1>
        </div>

        <div className={styleComplaint.dataTable}>
          <div className={styleComplaint.search}>
            <div>
              <span>Complain Data</span>
            </div>
            <div>
              <input type="text" />
              <button>Search</button>
            </div>
          </div>
          <hr />

          <div className="filter"></div>

          <div className={styleComplaint.data}>
            <table>
              <thead>
                <tr>
                  <th>Column 1</th>
                  <th>Column 2</th>
                  <th>Column 3</th>
                  <th>Column 4</th>
                  <th>Column 5</th>
                  <th>Column 6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                  <td>Data 4</td>
                  <td>Data 5</td>
                  <td>Data 6</td>
                </tr>
                <tr>
                  <td>Data 7</td>
                  <td>Data 8</td>
                  <td>Data 9</td>
                  <td>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste delectus a unde numquam non! Architecto modi sequi reprehenderit facere libero!</td>
                  <td>Data 11</td>
                  <td>Data 12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
