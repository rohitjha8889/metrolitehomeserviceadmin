"use client";
import { useState, useContext, useEffect } from "react";
import addproductstyle from "../../style/addproduct.module.css";
import DataContext from "../../Data/DataContext";
import { useRouter } from 'next/navigation'; // Importing 'next/router' instead of 'next/navigation'
import { useSearchParams } from 'next/navigation'; // Importing 'next/router' instead of 'next/navigation'
import Image from "next/image";

const UpdateProduct = () => {
    const router = useRouter();
    const { services, fetchLastChildById, lastchild, fetchProductById, singleProduct, modifyProduct } = useContext(DataContext);
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        discount: 0,
        stock: 0,
        servicePartner: 0,
        duration: 0,
        selectedCategory: '', // Change category field to selectedCategory
        selectedSubCategory: '', // Change subCategory field to selectedSubCategory
        status: 'active'
    });

    useEffect(() => {
        fetchProductById(productId)
    }, [productId, fetchProductById])

    useEffect(() => {
        if (singleProduct) {
            setFormData({
                name: singleProduct.name,
                description: singleProduct.description,
                price: singleProduct.price,
                discount: singleProduct.discount,
                stock: singleProduct.stock,
                servicePartner: singleProduct.servicePartner,
                duration: singleProduct.duration,
                selectedCategory: singleProduct.selectedCategory, // Update category field to selectedCategory
                selectedSubCategory: singleProduct.selectedSubCategory, // Update subCategory field to selectedSubCategory
                status: singleProduct.status
            });
        }
    }, [singleProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        // console.log(value)
        fetchLastChildById(value)
        fetchLastChildById(value)
        setFormData({ ...formData, selectedCategory: value }); 
    };

    const handleSubCategoryChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, selectedSubCategory: value }); 
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, status: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); 
        modifyProduct(productId, formData)
        router.push('/services')
    };

    

    const renderImages = () => {
        return singleProduct.images.map((imageName, index) => (
            <Image key={index} src={`http://77.37.47.56:5000/productimage/${imageName}`} alt={`Image ${index}`} width={300} height={200} className={addproductstyle.productImage} />
        ));
    };

    return (
        <>
            <div className={addproductstyle.main}>
                <form onSubmit={handleSubmit}>
                    <h2>Update Product</h2>
                    <div className={addproductstyle.productImagesContainer}>
                {singleProduct.images && renderImages()}
                </div>


                    <div className={addproductstyle.categorySelect}>
                        <div>
                            <label htmlFor="category"> Select Category</label>
                            <select name="category" id="" value={formData.selectedCategory} onChange={handleCategoryChange}>
                                <option value="">Select a category</option>
                                {services.map((category, index) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="subCategory"> Select Sub Category</label>
                            <select name="subCategory" id="" value={formData.selectedSubCategory} onChange={handleSubCategoryChange}>
                                <option value="">Select a subcategory</option>
                                {lastchild.map((subcategory) => (
                                    <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Enter Name" onChange={handleInputChange} value={formData.name} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea type="text" name="description" placeholder="Enter Description" onChange={handleInputChange} value={formData.description} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" placeholder="Enter Price" min={0} onChange={handleInputChange} value={formData.price} />
                    </div>
                    <div>
                        <label htmlFor="discount">Discount</label>
                        <input type="number" name="discount" placeholder="Enter Discount" min={0} onChange={handleInputChange} value={formData.discount} />
                    </div>
                    <div>
                        <label htmlFor="stock">Stock</label>
                        <input type="number" name="stock" placeholder="Enter Stock" min={0} onChange={handleInputChange} value={formData.stock} />
                    </div>
                    <div>
                        <label htmlFor="servicePartner">Service Partner</label>
                        <input type="number" name="servicePartner" placeholder="Enter Service Partner" min={0} onChange={handleInputChange} value={formData.servicePartner} />
                    </div>
                    <div>
                        <label htmlFor="duration">Enter Duration</label>
                        <input type="number" name="duration" placeholder="Enter Duration" min={0} onChange={handleInputChange} value={formData.duration} />
                    </div>

                    <div className={addproductstyle.statusbox}>
                        <label htmlFor="status">Status</label>
                        <select name="status" value={formData.status} onChange={handleStatusChange}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button type="submit">Update Product</button>
                </form>
            </div>
        </>
    );
};

export default UpdateProduct;
