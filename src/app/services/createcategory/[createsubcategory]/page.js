"use client";

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataContext from '../../../Data/DataContext';

const createSubCategory = ({ params }) => {
  const router = useRouter();
  const { createCategory } = useContext(DataContext);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  
  const parentId = params.createsubcategory;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('categoryImage', image);
    formData.append('parentId', parentId);
     // Append position to formData
    try {
      const uploadSuccess = await createCategory(formData);
      
      if (uploadSuccess) {
        console.log("Category created successfully");
        setName('');
        setImage(null);
        setPosition('');
        router.push(`/services/${parentId}`);
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  

  return (
    <div style={{ height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleInputChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} name='categoryImage'/>
       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default createSubCategory;
