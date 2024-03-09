"use client";
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [banner, setBanner] = useState([]);
  const [services, setServices] = useState([]);
  const[subServices, setSubServices] = useState([])
  
  useEffect(() => {
    fetchBanner(); // Fetch banner data when component mounts
    fetchServices();
    fetchSubServices()
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await fetch('http://localhost:5000/allposter');
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      const jsonData = await response.json();
      setBanner(jsonData.reverse());
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  };

  const deleteBanner = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteposter/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete banner');
      }
      fetchBanner();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const uploadBanner = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/uploadposter", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
        fetchBanner();
        return true; // Indicate success
      } else {
        console.error("Failed to upload image");
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return false; // Indicate failure
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/allcategories');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const jsonData = await response.json();
      setServices(jsonData.reverse());
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const fetchSubServices = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:5000/categories/${clientId}/children`);
      if (!response.ok) {
        throw new Error('Failed to fetch sub-services');
      }
      const jsonData = await response.json();
      setSubServices(jsonData)
    } catch (error) {
      console.error('Error fetching sub-service data:', error);
      return [];
    }
  };

  const createCategory = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/categories", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Category created successfully");
        fetchServices()
        return true;
      } else {
        console.error("Failed to create category");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };
  

  return (
    <DataContext.Provider value={{ banner, deleteBanner, uploadBanner, services, fetchSubServices, subServices, createCategory}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
