import React from 'react';
import {Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const {product}= props;
    return (
        <div key={product._id} class="card" >
                            <Link to={`/product/${product._id}`} >
                                <img class="medium" src={product.image} alt={product.name} />
                            </Link>
                            <div class="card-body" >
                                <Link to={`/product/${product._id}`} >
                                    <h2 > {product.name} </h2>
                                </Link>
                                <Rating 
                                    rating= {product.rating} 
                                    numReviews={product.numReviews}>
                                </Rating>
                                <div class="price" >
                                     ₦{product.price}
                                </div>
                            </div >
                        </div>
    )
};