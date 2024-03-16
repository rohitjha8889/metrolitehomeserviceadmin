"use client";

import { useState, useContext } from "react";
import addproductstyle from "../../style/addproduct.module.css";
import DataContext from "../../Data/DataContext";
import { useRouter } from 'next/navigation';

const AddProduct = () => {
    const router = useRouter()
    const { services, fetchLastChildById, lastchild, addProduct } = useContext(DataContext);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [status, setStatus] = useState('active'); // Status state

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        discount: 0,
        stock: 0,
        servicePartner: 0,
        duration: 0,
        minimumOrder: false,
        hygineCharge: false
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        fetchLastChildById(categoryId);
    };

    const handleSubCategoryChange = (e) => {
        const subCategoryId = e.target.value;
        setSelectedSubCategory(subCategoryId);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCategory || !selectedSubCategory) {
            alert('Please select a category and subcategory');
            return;
        }

        // Check if any required field is empty
        for (const key in formData) {
            if (!formData[key] && key !== 'minimumOrder' && key !== 'hygineCharge') {
                alert('Please fill in all fields');
                return;
            }
        }

        try {
            const formDataToSend = new FormData();

            // Append file to FormData
            formDataToSend.append('image', e.target.image.files[0]);

            // Append other form data fields to FormData
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('discount', formData.discount);
            formDataToSend.append('stock', formData.stock);
            formDataToSend.append('servicePartner', formData.servicePartner);
            formDataToSend.append('duration', formData.duration);
            formDataToSend.append('minimumOrder', formData.minimumOrder ? 'yes' : 'no');
            formDataToSend.append('hygineCharge', formData.hygineCharge ? 'yes' : 'no');
            formDataToSend.append('selectedCategory', selectedCategory);
            formDataToSend.append('selectedSubCategory', selectedSubCategory);
            formDataToSend.append('status', status);

            // Call the addProduct function from context API with formDataToSend
            await addProduct(formDataToSend);

            console.log('Product added successfully');
            setFormData({
                name: '',
                description: '',
                price: 0,
                discount: 0,
                stock: 0,
                servicePartner: 0,
                duration: 0,
                minimumOrder: false,
                hygineCharge: false
            });
            setImagePreview(null);
            setSelectedCategory('');
            setSelectedSubCategory('');
            setStatus('active');

            router.push('/services')
        } catch (error) {
            console.error('Error while adding product:', error);
            // Handle any errors
        }
    };




return (
    <>
        <div className={addproductstyle.main}>
            <form onSubmit={handleSubmit}>
                <h2>Add Product</h2>
                <div>
                    {imagePreview && <img src={imagePreview} alt="Preview" className={addproductstyle.productImage} />}
                    <input type="file" onChange={handleImageChange} name="image" style={{ width: '20%' }} />
                </div>

                <div className={addproductstyle.categorySelect}>
                    <div>
                        <label htmlFor="category"> Select Category</label>
                        <select name="category" id="" onChange={handleCategoryChange}>
                            <option value="">Select a category</option>
                            {services.map((category, index) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="subCategory"> Select Sub Category</label>
                        <select name="subCategory" id="" onChange={handleSubCategoryChange}>
                            <option value="">Select a subcategory</option>
                            {lastchild.map((subcategory) => (
                                <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Enter Name" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" placeholder="Enter Description" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" placeholder="Enter Price" min={0} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="discount">Discount</label>
                    <input type="number" name="discount" placeholder="Enter Discount" min={0} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="stock" placeholder="Enter Stock" min={0} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="servicePartner">Service Partner</label>
                    <input type="number" name="servicePartner" placeholder="Enter Service Partner" min={0} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="duration">Enter Duration</label>
                    <input type="number" name="duration" placeholder="Enter Duration" min={0} onChange={handleInputChange} />
                </div>

                <div className={addproductstyle.questionbox}>
                    <input type="checkbox" id="minimumOrder" name="minimumOrder" onChange={handleCheckboxChange} />
                    <label htmlFor="minimumOrder">Does minimum order value check applies? </label>
                </div>

                <div className={addproductstyle.questionbox}>
                    <input type="checkbox" id="hygineCharge" name="hygineCharge" onChange={handleCheckboxChange} />
                    <label htmlFor="hygineCharge">Does hygiene charge applies?</label>
                </div>

                <div className={addproductstyle.statusbox}>
                    <label htmlFor="status">Status</label>
                    <select name="status" value={status} onChange={handleStatusChange}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <button type="submit">Add Product</button>
            </form>
        </div>
    </>
);
};

export default AddProduct;
