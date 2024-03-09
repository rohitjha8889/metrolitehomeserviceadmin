"use client";

import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import DataContext from '../../Data/DataContext'; // Update path accordingly

const CreateCategory = () => {
  const router = useRouter();
  const { createCategory } = useContext(DataContext); // Access createCategory function from context
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState(''); // State for dropdown value

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('categoryImage', image);
    formData.append('position', selectedValue); // Include selected value in formData

    try {
      const uploadSuccess = await createCategory(formData);
      if (uploadSuccess) {
        console.log("Category created successfully");
        setName('');
        setImage(null);
        setSelectedValue('');
        router.push('/services');
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

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div style={{ height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleInputChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} name='categoryImage'/>

        {/* Dropdown for selecting a value */}
        <select value={selectedValue} onChange={handleSelectChange}>
          <option value="">Select...</option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateCategory;
