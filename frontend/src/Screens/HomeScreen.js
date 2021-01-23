import React, { useEffect } from 'react';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';


export default function HomeScreen(){
    const dispatch = useDispatch();
    const productList= useSelector((state) => state.productList);
    const {loading, error, products}= productList;
    useEffect(() =>{
        dispatch(listProducts());
    }, [dispatch]);

    return(
        <div>
            {loading? (<LoadingBox></LoadingBox>):
            error? (<MessageBox variant="danger">{error}</MessageBox>):
            (<div class="rows center" > {
            products.map((product) => (
                <Product key={product._id} product={product}></Product>
            ))}
        </div> 
        )}
        </div>
    );
};