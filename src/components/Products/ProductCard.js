import React from 'react';
import Button from '../Button/Button';
import './ProductCard.css';

const ProductCard = (props) => {
    return (
        <div>
            <div className='productsContainer'>
                <div className="card" key={props.product.productId}>
                    <h1>Product name: {props.product.productName}</h1>
                    <h1>Product Id: {props.product.productId}</h1>
                    <p className="price">Product price: {props.productPrice}</p>
                    <Button
                        className="deleteButton"
                        textContent='Delete'
                        onclick={(e) => props.deleteProduct(e, props.product.productId)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCard


