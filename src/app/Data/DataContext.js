"use client";
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [banner, setBanner] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [category, setCategory] = useState('');
  const [lastchild, setlastchild] = useState([])


  // Product Page 
  const[allproducts, setAllProducts] = useState([]);
  const[singleProduct, setSingleProduct] = useState('')


  useEffect(() => {
    fetchBanner(); // Fetch banner data when component mounts
    fetchServices();
    fetchSubServices();
    fetchServiceById();
    fetchAllProduct()

  }, []);



  const fetchBanner = async () => {
    try {
      const response = await fetch('http://77.37.47.56:5000/allposter');
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
      const response = await fetch(`http://77.37.47.56:5000/deleteposter/${id}`, {
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
      const response = await fetch("http://77.37.47.56:5000/uploadposter", {
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
      const response = await fetch('http://77.37.47.56:5000/allcategories');
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
      const response = await fetch(`http://77.37.47.56:5000/categories/${clientId}/children`);
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

  const fetchServiceById = async (clientId) => {
    try {
      const response = await fetch(`http://77.37.47.56:5000/categories/${clientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch specific category');
      }
      const jsonData = await response.json();
      setCategory(jsonData)
    } catch (error) {
      console.error('Error fetching specific category:', error);
      return [];
    }
  }

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://77.37.47.56:5000/deletecategory/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      fetchServices()

    } catch (error) {
      console.error('Error deleting delete category:', error);
    }
  };
  const deleteSubCategory = async (id) => {
    try {
      const response = await fetch(`http://77.37.47.56:5000/deletecategory/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      fetchServices()

    } catch (error) {
      console.error('Error deleting delete category:', error);
    }
  };



  const createCategory = async (formData) => {
    try {
      const response = await fetch("http://77.37.47.56:5000/categories", {
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

  const fetchLastChildById = async (categoryId) => {
    try {
      const response = await fetch(`http://77.37.47.56:5000/last-level-children/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sub-services');
      }
      const jsonData = await response.json();
      setlastchild(jsonData)
    } catch (error) {
      console.error('Error fetching sub-service data:', error);
      return [];
    }
  }


// Product Api fetching


  const addProduct = async (formData) => {
    try {


      const response = await fetch("http://77.37.47.56:5000/addproduct", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product added successfully");
        fetchAllProduct()
        return true;
      } else {
        console.error("Failed to add Product");
        return false;
      }

    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }



  const fetchAllProduct = async () => {
    try {
      const response = await fetch('http://77.37.47.56:5000/getallproduct');
      if (!response.ok) {
        throw new Error('Failed to fetch all product');
      }
      const jsonData = await response.json();
      setAllProducts(jsonData.reverse());
      
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };


  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`http://77.37.47.56:5000/getproduct/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch specific category');
      }
      const jsonData = await response.json();
      setSingleProduct(jsonData)
    } catch (error) {
      console.error('Error fetching specific category:', error);
      return [];
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://77.37.47.56:5000/deleteproduct/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      fetchAllProduct()

    } catch (error) {
      console.error('Error deleting delete category:', error);
    }
  };


  const modifyProduct = async (productId, formData) => {
    try {
      const response = await fetch(`http://77.37.47.56:5000/modifyproduct/${productId}`, {
        method: 'PUT', // Assuming the API uses PUT for modification
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to modify product');
      }

      
      fetchAllProduct(); 
    } catch (error) {
      console.error('Error modifying product:', error);
    }
  };
  
  

  return (
    <DataContext.Provider value={{ banner, deleteBanner, uploadBanner, services, fetchSubServices, subServices, createCategory, fetchServiceById, category, deleteCategory, deleteSubCategory, fetchLastChildById, lastchild, addProduct, allproducts, fetchProductById, singleProduct, deleteProduct, modifyProduct }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
