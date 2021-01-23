
import { PaystackButton } from "react-paystack";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../constants/orderConstants";


export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const userSignin = useSelector((state) =>state.userSignin);
    const {userInfo} = userSignin;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

    const dispatch = useDispatch();
    
    useEffect(() =>{
        if ( !order || successPay || successDeliver || (order && order._id !== orderId) ) {
            dispatch({type: ORDER_PAY_RESET});
             dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } else{
            if(!order.isPaid){

            }
        }
       
     }, [dispatch, order, orderId, successPay, successDeliver]);
    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(order, paymentResult));
    };
   
    const publicKey = process.env.REACT_APP_API_KEY;
    const email = userInfo.email;
    const componentProps = {
        email,
        // amount,
        publicKey,
        text: "Pay Now",
        onSuccess: successPaymentHandler,
    };

    const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

    return loading? (<LoadingBox></LoadingBox>):
        error? (<MessageBox variant="danger">{error}</MessageBox>)
        :
        (
            <div>
                <h1>Order {order._id}</h1>
                <div className="rows top">
                    <div className="col-2">
                        <ul>
                            <li>
                                <div className="card card-body">
                                    <h1>Shipping</h1>
                                    <p>
                                        <strong>Name: </strong>{order.shippingAddress.fullName}<br/>
                                        <strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                    {
                                      order.isDelivered? (<MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>)
                                      : 
                                     ( <MessageBox variant="danger">Not Delivered</MessageBox>)
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h1>Payment</h1>
                                    {/* <p>
                                        <strong>Method: </strong>{order.paymentMethod}
                                    </p> */}
                                    {
                                      order.isPaid? (<MessageBox variant="success">Paid at {order.paidAt}</MessageBox>)
                                      : 
                                     ( <MessageBox variant="danger">Not Paid</MessageBox>)
                                    }
                                </div>
                            </li>
                             <li>
                                <div className="card card-body">
                                    <h1>Order Items</h1>
                                    <ul>
                                        {order.orderItems.map((item) =>(
                                            <li key={item.product}>
                                                <div className="rows">
                                                    <div>
                                                        <img src= {item.image} alt={item.name} className="small"></img>
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>
                                                        ₦{item.price} x {item.qty} = ₦{item.qty * item.price}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                   <h2>Order Summary</h2> 
                                </li>
                                <li>
                                    <div className="rows">
                                        <div>Items</div>
                                        <div>₦{order.itemsPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="rows">
                                        <div>Shipping</div>
                                        <div>₦{order.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="rows">
                                        <div>Tax</div>
                                        <div>₦{order.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="rows">
                                        <div><strong>Total</strong></div>
                                        <div><strong>₦{order.totalPrice.toFixed(2)}</strong></div>
                                    </div>
                                </li>
                                {
                                    !order.isPaid && (
                                        <>
                                        {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)}
                                        {loadingPay && (<LoadingBox></LoadingBox>)}
                                        <li>
                                            <PaystackButton amount={order.totalPrice * 100} className="primary block" {...componentProps}/>
                                        </li>
                                        </>
                                    )
                                }
                                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && (
                                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                    )}
                                    <button
                                        type="button"
                                        className="primary block"
                                        onClick={deliverHandler} >
                                        Deliver Order
                                    </button>
                                    </li>
                                )}
                            </ul>
                        </div>                    
                    </div>
                </div>
            </div>
        );
};