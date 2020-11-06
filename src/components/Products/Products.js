import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import classes from './Products.module.css';
import Button from '../Button/Button';

// const backendUrl = 'https://gamma-test-backend.herokuapp.com'
const backendUrl = 'http://localhost:8080'

const Products = () => {

    const [products, setProducts] = useState([]);

    async function getProducts() {
        try {
            const fetchResponse = await fetch(`${backendUrl}/records`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            });
            const data = await fetchResponse.json();
            setProducts(data);
            return;
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    async function sendProduct() {
        try {
            const fetchResponse = await fetch(`${backendUrl}/records`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(productData)
            });
            const data = await fetchResponse.json();
            if (productData._id === '') {
                alert('Provide Id');
                return false;
            }
            if (productData.productName === '') {
                alert('Provide name');
                return false;
            }
            if (productData.productPrice === '') {
                alert('Set price');
                return false;
            }
            setProductData({ _id: '', productName: '', productPrice: '' });
            return data;
        } catch (error) {
            return error;
        }
    }

    const [productData, setProductData] = useState({ _id: '', productName: '', productPrice: '' })

    const handleProductId = (e) => {
        setProductData({ _id: e.target.value, productName: productData.productName, productPrice: productData.productPrice });
    };
    const handleproductName = (e) => {
        setProductData({ _id: productData._id, productName: e.target.value, productPrice: productData.productPrice });
    };
    const handleProductPrice = (e) => {
        setProductData({ _id: productData._id, productName: productData.productName, productPrice: e.target.value });
    };

    async function handleSendPost(e) {
        e.preventDefault();
        sendProduct();
        await getProducts();
    }

    async function deleteProduct(id) {
        console.log(id)
        try {
            await fetch(`${backendUrl}/records/${id}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' }
            });
            await getProducts();
            return;
        } catch (error) {
            return error;
        }
    }

    // function handleDeleteClick(e) {
    //     e.preventDefault();
    //     deleteProduct();
    // }

    return (
        <div className='container'>
            <div className={classes.title}>
                <h2>Products in Database</h2>
            </div>
            <div className={`${classes.productsContainer} row`}>
                {products.map((product) =>
                    <ProductCard 
                        key={product.productId}
                        product={product}
                        deleteProduct={() => deleteProduct(product.productId)} />
                )}
            </div>
            <div className={classes.title}>
                <h2>Add new product</h2>
            </div>
            <div className={`${classes.postProductWrapper} row`}>
                <textarea type="number" value={productData._id} onChange={handleProductId} placeholder='Product Id' />
                <textarea value={productData.productName} onChange={handleproductName} placeholder='Product name' />
                <textarea value={productData.productPrice} onChange={handleProductPrice} placeholder='Price' />
                <div>
                    <Button className={classes.sendProductButton} textContent='Post' onClick={handleSendPost} />
                </div>
            </div>
        </div>
    )
}

export default Products;
